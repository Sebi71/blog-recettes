import * as Yup from "yup";


export const signUpSchema = Yup.object().shape({
    name: Yup.string().required("Pseudo obligatoire"),
    email: Yup.string().email("Format invalide").required("Email obligatoire"),
    password: Yup.string()
      .min(8, "Mot de passe trop court")
      .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .matches(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
      .matches(/\d/, "Le mot de passe doit contenir au moins un chiffre")
      .matches(/[@#$!%*?&.,;:()_+={}~-]/, "Le mot de passe doit contenir au moins un caractère spécial")
      .required("Mot de passe obligatoire"),
  });
  
 export const signInSchema = Yup.object().shape({
    email: Yup.string().email("Format invalide").required("Email obligatoire"),
    password: Yup.string()
      .min(8, "Mot de passe trop court")
      .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .matches(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
      .matches(/\d/, "Le mot de passe doit contenir au moins un chiffre")
      .matches(/[@#$!%*?&.,;:()_+={}~-]/, "Le mot de passe doit contenir au moins un caractère spécial")
      .required("Mot de passe obligatoire"),
  });

  export const changePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Ancien mot de passe est requis"),
    newPassword: Yup
      .string()
      .required("Nouveau mot de passe est requis")
      .min(8, "Mot de passe trop court")
      .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .matches(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
      .matches(/\d/, "Le mot de passe doit contenir au moins un chiffre")
      .matches(/[@#$!%*?&.,;:()_+={}~-]/, "Le mot de passe doit contenir au moins un caractère spécial")
      .test(
        'different-from-old-password',
        'Le nouveau mot de passe doit être différent de l\'ancien mot de passe',
        function (value) {
          const { oldPassword } = this.parent;
          return value !== oldPassword;
        }
      ),
    confirmNewPassword: Yup
      .string()
      .required("Confirmation du mot de passe")
      .oneOf([Yup.ref("newPassword"), undefined], "Les mots de passe ne correspondent pas")
  });
