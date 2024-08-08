/* eslint-disable react/prop-types */
import Modal from "../Modal";
import { cookingSchemaValidation } from "../../schemas/cookingSchemas";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "./index.scss";

export default function AddAndUpdate({ openModal, handleModal }) {
  return (
    <div>
      <Modal openModal={openModal} handleModal={handleModal}>
        <Formik
          validationSchema={cookingSchemaValidation}
          initialValues={{
            category: "Sélectionnez une catégorie",
            name: "",
            ingredients: "",
            preparation: "",
            link: "",
            image: "",
            pdf: "",
          }}
        >
          <Form className="form">
            <div className="input-item">
              <label htmlFor="category">Catégorie :</label>
              <Field as="select" name="category" id="category">
                <option value="">Sélectionnez une catégorie</option>
                <option value="starter">Entrée</option>
                <option value="dish">Plat</option>
                <option value="dessert">Déssert</option>
                <option value="beverage">Boissons</option>
                <option value="various">Divers</option>
              </Field>
              <ErrorMessage name="category" />
            </div>
            <div className="input-item">
              <label htmlFor="name">Intitulé :</label>
              <Field type="text" name="name" id="name" />
              <ErrorMessage name="name" />
            </div>

            <div className="input-item">
              <label htmlFor="ingredients">Ingrédients :</label>
              <Field type="text" name="ingredients" id="ingredients" />
              <ErrorMessage name="ingredients" />
            </div>

            <div className="input-item">
              <label htmlFor="preparation">Préparation :</label>
              <Field type="textarea" name="preparation" id="preparation" />
              <ErrorMessage name="preparation" />
            </div>

            <div className="input-item">
              <label htmlFor="link">Lien vers la recette :</label>
              <Field type="text" name="link" id="link" />
              <ErrorMessage name="link" />
            </div>

            <div className="input-item">
              <label htmlFor="image">Image :</label>
              <Field type="file" name="image" accept="image/gif, image/jpeg, image/png, image/webp image/jpg" />
              <ErrorMessage name="image" />
            </div>
            <div className="input-item">
              <label htmlFor="pdf">PDF :</label>
              <Field type="file" name="pdf" accept="application/pdf" />
              <ErrorMessage name="pdf" />
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}
