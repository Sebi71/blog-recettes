/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../Modal";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cookingSchemaValidation } from "../../schemas/cookingSchemas";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../db/firebase";
import useAuth from "../../hook/useAuth";
import { useFirebase } from "../../hook/useCooking";
import { Delete } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

export default function AddCooking({ openModal, handleModal }) {
  const { addCooking } = useFirebase();
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [pdfPreview, setPdfPreview] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [errorPdf, setErrorPdf] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(cookingSchemaValidation),
    defaultValues: {
      category: "",
      name: "",
      ingredients: [{ value: "" }],
      preparation: "",
      link: "",
      image: "",
      pdf: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const handleCloseModal = () => {
    reset();
    setFile(null);
    setImagePreview(null);
    setPdfFile(null);
    setPdfPreview(null);
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
        setImagePreview(null);
        return;
      }

      setFile(selectedFile);
      if (selectedFile) {
        const imageUrl = URL.createObjectURL(selectedFile);
        setImagePreview(imageUrl);
      }
    } else if (e.target.id === "pdf") {
      const validPdfType = "application/pdf";
      if (selectedFile && selectedFile.type !== validPdfType) {
        setErrorPdf("Veuillez sélectionner un fichier PDF valide.");
        setPdfFile(null);
        setPdfPreview(null);
        return;
      }

      setPdfFile(selectedFile);
      if (selectedFile) {
        const pdfUrl = URL.createObjectURL(selectedFile);
        setPdfPreview(pdfUrl);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (formData) => {
    try {
      if (!user) {
        throw new Error(
          "L'utilisateur doit être authentifié pour ajouter une recette."
        );
      }

      const formattedData = {
        ...formData,
        ingredients: formData.ingredients
          ? formData.ingredients
              .map((ingredient) => ingredient.value)
              .join(", ")
          : "",
      };

      let imageUrl = "";
      if (file) {
        const imageRef = ref(storage, `recettesImages/${file.name}`);
        await uploadBytes(imageRef, file);
        imageUrl = await getDownloadURL(imageRef);
      }

      let pdfUrl = "";
      if (pdfFile) {
        const pdfRef = ref(storage, `recettesPDF/${pdfFile.name}`);
        await uploadBytes(pdfRef, pdfFile);
        pdfUrl = await getDownloadURL(pdfRef);
      }

      await addCooking({
        ...formattedData,
        ingredients: formData.ingredients.map((ingredient) => ingredient.value),
        image: imageUrl,
        pdf: pdfUrl,
        authorName: user.displayName,
        authorId: user.uid,
        createdAt: new Date(),
      });
      toast.success("La recette a été ajoutée avec succès");
      handleCloseModal();
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire", error);
    }
  };

  return (
    <div>
      <Modal openModal={openModal} handleModal={handleCloseModal}>
        <form className="form-add" onKeyDown={handleKeyDown} onSubmit={handleSubmit(onSubmit)}>
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

          {imagePreview && (
            <img className="view-image" src={imagePreview} alt="Preview" />
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

          {pdfPreview && (
            <div className="pdf-preview">
              <p>
                PDF sélectionné :{" "}
                <a href={pdfPreview} target="_blank" rel="noopener noreferrer">
                  Ouvrir le PDF
                </a>
              </p>
            </div>
          )}

          <button className="btn-form" type="submit">
            Ajouter la recette
          </button>
        </form>
      </Modal>
    </div>
  );
}
