import * as Yup from "yup";

export const cookingSchemaValidation = Yup.object().shape({
    category: Yup.string().required("La catégorie est requise"),
    name: Yup.string().required("Nom obligatoire"),
    ingredients: Yup.string(),
    preparation: Yup.string(),
    image: Yup.string(),
})