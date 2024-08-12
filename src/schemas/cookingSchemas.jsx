import * as Yup from 'yup';

export const cookingSchemaValidation = Yup.object().shape({
    category: Yup.string().required("La catégorie est requise"),
    name: Yup.string().trim().required("Champ obligatoire"),
    ingredients: Yup.array().of(
        Yup.object().shape({
          value: Yup.string()
        })
      ), 
    preparation: Yup.string(),
    link: Yup.string().url("Le lien est invalide"),
    image: Yup.mixed(),
    pdf: Yup.mixed(),
});

