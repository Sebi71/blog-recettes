/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cookingSchemaValidation } from "../../schemas/cookingSchemas";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../db/firebase";
import useAuth from "../../hook/useAuth";
import { useFirebase } from "../../hook/useCooking";
import { Delete } from "lucide-react";
import "./index.scss";

export default function UpdateCooking({ openModal, handleModal }) {
  const navigate = useNavigate();
  const { cookings, updateCooking } = useFirebase();
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentPdf, setCurrentPdf] = useState(null);
  const [errorImage, setErrorImage] = useState("");
  const [errorPdf, setErrorPdf] = useState("");

  const { id } = useParams();

  const cookingUpdated = cookings.find((cooking) => cooking.id === id);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(cookingSchemaValidation),
    defaultValues: cookingUpdated,
  });

  useEffect(() => {
    if (cookingUpdated) {
      reset({
        ...cookingUpdated,
        ingredients: cookingUpdated.ingredients.map((ingredient) => ({
          value: ingredient,
        })),
      });
      setCurrentImage(cookingUpdated.image);
      setCurrentPdf(cookingUpdated.pdf);
    }
  }, [cookingUpdated, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const handleCloseModal = () => {
    reset();
    setErrorImage("");
    setErrorPdf("");
    handleModal(false);
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (e.target.id === "image") {
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",
      ];
      if (selectedFile && !validImageTypes.includes(selectedFile.type)) {
        setErrorImage(
          "Veuillez sélectionner un fichier image valide (jpeg, png, webp, jpg)."
        );
        setFile(null);
        setCurrentImage(null);
        return;
      }

      setFile(selectedFile);
      if (selectedFile) {
        const imageUrl = URL.createObjectURL(selectedFile);
        setCurrentImage(imageUrl);
      }
    } else if (e.target.id === "pdf") {
      const validPdfType = "application/pdf";
      if (selectedFile && selectedFile.type !== validPdfType) {
        setErrorPdf("Veuillez sélectionner un fichier PDF valide.");
        setPdfFile(null);
        setCurrentPdf(null);
        return;
      }

      setPdfFile(selectedFile);
      if (selectedFile) {
        const pdfUrl = URL.createObjectURL(selectedFile);
        setCurrentPdf(pdfUrl);
      }
    }
  };

  const onSubmit = async (formData) => {
    try {
      if (!user) {
        throw new Error(
          "L'utilisateur doit être authentifié pour modifier une recette."
        );
      }

      const ingredientsArray = Array.isArray(formData.ingredients)
        ? formData.ingredients.map((ingredient) => ingredient.value)
        : [];

      const formattedData = {
        ...formData,
        ingredients: ingredientsArray,
      };

      let imageUrl = currentImage;
      if (file) {
        const imageRef = ref(storage, `recettesImages/${file.name}`);
        await uploadBytes(imageRef, file);
        imageUrl = await getDownloadURL(imageRef);
      }

      let pdfUrl = currentPdf;
      if (pdfFile) {
        const pdfRef = ref(storage, `recettesPDF/${pdfFile.name}`);
        await uploadBytes(pdfRef, pdfFile);
        pdfUrl = await getDownloadURL(pdfRef);
      }

      await updateCooking({
        ...formattedData,
        ingredients: formData.ingredients.map((ingredient) => ingredient.value),
        image: imageUrl,
        pdf: pdfUrl,
        authorName: user.displayName,
        authorId: user.uid,
        createdAt: new Date(),
      });
      localStorage.setItem("toastUpdate", "Recette modifié avec succès");
      handleCloseModal();
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire", error);
    }
  };

  return (
    <div>
      <Modal openModal={openModal} handleModal={handleCloseModal}>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-item">
            <label htmlFor="category" className="label-form">
              Catégorie :
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <select id="category" className="input-category" {...field}>
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="Entrées">Entrées</option>
                  <option value="Plats">Plats</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Boissons">Boissons</option>
                  <option value="Autres">Autres</option>
                </select>
              )}
            />
            {errors.category && (
              <div className="error-form">{errors.category.message}</div>
            )}
          </div>

          <div className="input-item">
            <label htmlFor="name" className="label-form">
              Intitulé :
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  id="name"
                  className="input-form"
                  {...field}
                />
              )}
            />
            {errors.name && (
              <div className="error-form">{errors.name.message}</div>
            )}
          </div>

          <div className="input-item">
            <label htmlFor="ingredients" className="label-form">
              Ingrédients :
            </label>
            {fields.map((field, index) => (
              <div key={field.id} className="ingredient-item">
                <Controller
                  name={`ingredients[${index}].value`}
                  control={control}
                  render={({ field }) => (
                    <input
                      id="ingredients"
                      type="text"
                      className="input-form"
                      {...field}
                    />
                  )}
                />
                {index > 0 && (
                  <Delete
                    className="remove-ingredient-btn"
                    onClick={() => remove(index)}
                  />
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ value: "" })}
              className="add-ingredient-btn"
            >
              + Ajouter un ingrédient
            </button>
            {errors.ingredients && (
              <div className="error-form">{errors.ingredients.message}</div>
            )}
          </div>

          <div className="input-item">
            <label htmlFor="preparation" className="label-form">
              Préparation :
            </label>
            <Controller
              name="preparation"
              control={control}
              render={({ field }) => (
                <textarea
                  id="preparation"
                  className="input-textarea"
                  {...field}
                />
              )}
            />
            {errors.preparation && (
              <div className="error-form">{errors.preparation.message}</div>
            )}
          </div>

          <div className="input-item">
            <label htmlFor="link" className="label-form">
              Lien vers la recette :
            </label>
            <Controller
              name="link"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  id="link"
                  className="input-form"
                  {...field}
                />
              )}
            />
            {errors.link && (
              <div className="error-form">{errors.link.message}</div>
            )}
          </div>

          <div className="input-item">
            <label htmlFor="image" className="label-form">
              Image :
            </label>
            <input
              type="file"
              id="image"
              className="input-file"
              accept="image/jpeg, image/png, image/webp, image/jpg"
              onChange={handleChange}
            />
            {errors.image && (
              <div className="error-form">{errors.image.message}</div>
            )}
            {errorImage && <div className="error-form">{errorImage}</div>}
          </div>

          {currentImage && (
            <img className="view-image" src={currentImage} alt="Preview" />
          )}

          <div className="input-item">
            <label htmlFor="pdf" className="label-form">
              PDF :
            </label>
            <input
              type="file"
              id="pdf"
              className="input-file"
              accept="application/pdf"
              onChange={handleChange}
            />
            {errors.pdf && (
              <div className="error-form">{errors.pdf.message}</div>
            )}
            {errorPdf && <div className="error-form">{errorPdf}</div>}
          </div>

          {currentPdf && (
            <div className="pdf-preview">
              <p>
                PDF sélectionné :{" "}
                <a href={currentPdf} target="_blank" rel="noopener noreferrer">
                  Ouvrir le PDF
                </a>
              </p>
            </div>
          )}

          <button className="btn-form" type="submit">
            Modifier la recette
          </button>
        </form>
      </Modal>
    </div>
  );
}
