import { useEffect, useState } from "react";
// import { auth } from "../../db/firebase";
import useAuth from "../../hook/useAuth";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import logoGoogle from "/logo-google.webp";
import "./index.scss";

const signUpSchema = Yup.object().shape({
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

const signInSchema = Yup.object().shape({
  email: Yup.string().email("Format invalide").required("Email obligatoire"),
  password: Yup.string()
    .min(8, "Mot de passe trop court")
    .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .matches(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
    .matches(/\d/, "Le mot de passe doit contenir au moins un chiffre")
    .matches(/[@#$!%*?&.,;:()_+={}~-]/, "Le mot de passe doit contenir au moins un caractère spécial")
    .required("Mot de passe obligatoire"),
});

export default function SignInSignUp() {
  const { signUp, signIn, loginWithGoogle, resetPassword, redirectIfAuth } =
    useAuth();

  // const navigate = useNavigate();
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState("");
  const [errorsAuth, setErrorsAuth] = useState("");
  const [messageResetPassword, setMessageResetPassword] = useState("");

  useEffect(() => {
    redirectIfAuth();
  }, [redirectIfAuth]);

  const handleFormChange = () => {
    setIsSignUpActive(!isSignUpActive);
    setFormData({ email: "", password: "" });
    setErrors("");
    setErrorsAuth("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = () => {
    signUpSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        signUp(formData.name, formData.email, formData.password);
      })
      .catch((validationErrors) => {
        const formattedErrors = {};
        validationErrors.inner.forEach((error) => {
          formattedErrors[error.path] = error.message;
        });
        setErrors(formattedErrors);
      });
  };

  const handleSignIn = async () => {
    try {
      await signInSchema.validate(formData, { abortEarly: false });
      await signIn(formData.email, formData.password);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const formattedErrors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path] = err.message;
          }
        });
        setErrors(formattedErrors);
      } else if (error instanceof Error) {
        const errorMessage = error.message;
        if (errorMessage.includes("auth/invalid-credential")) {
          setErrorsAuth("Email ou mot de passe incorrect.");
        } else {
          setErrorsAuth(
            "Une erreur est survenue. Veuillez réessayer plus tard."
          );
        }
      }
    }
  };

  const handleResetPassword = async () => {
    if (formData.email) {
      try {
        const message = await resetPassword(formData.email);
        setMessageResetPassword(message);
        setErrors("");
        setErrorsAuth("");
        setFormData((prevData) => ({ ...prevData, password: "" }));
      } catch (error) {
        setMessageResetPassword(error.message);
      }
    } else {
      setErrors({
        email:
          "Veuillez entrer votre adresse email pour réinitialiser votre mot de passe.",
      });
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isSignUpActive) {
      handleSignUp();
    } else {
      handleSignIn();
    }
  };

  return (
    <section className="container">
      <form onSubmit={handleFormSubmit} className="form">
        {isSignUpActive ? (
          <h1 className="title">Inscription</h1>
        ) : (
          <h1 className="title">Connection</h1>
        )}

        {isSignUpActive && (
          <>
            <label htmlFor="name" className="label">
              Pseudo
            </label>
            <input
              type="text"
              onChange={handleInputChange}
              name="name"
              id="name"
              className="input"
              placeholder="Pseudo"
              value={formData.name || ""}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </>
        )}

        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          name="email"
          id="email"
          className="input"
          placeholder="Email"
        />

        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="password" className="label">
          Mot de passe
        </label>
        <input
          type="password"
          onChange={handleInputChange}
          name="password"
          id="password"
          className="input"
          placeholder="Mot de passe"
          value={formData.password || ""}
        />

        {isSignUpActive && <p className="info-password">Majuscule, minuscule, chiffre, caractère obligatoires</p>}

        {errors.password && <p className="error">{errors.password}</p>}
        {errorsAuth && <p className="error">{errorsAuth}</p>}
        {messageResetPassword && (
          <p className="message-reset">{messageResetPassword}</p>
        )}

        {isSignUpActive ? (
          <button type="submit" className="button">
            Créer un compte
          </button>
        ) : (
          <button type="submit" onClick={handleSignIn} className="button">
            Se connecter
          </button>
        )}

        {!isSignUpActive && (
          <a href="#" onClick={handleResetPassword} className="reset-password">
            Mot de passe oublié
          </a>
        )}

        {isSignUpActive ? (
          <a href="#" onClick={handleFormChange} className="link">
            Déjà un compte ? Se connecter
          </a>
        ) : (
          <a href="#" onClick={handleFormChange} className="link">
            Pas de compte ? S&apos;inscrire
          </a>
        )}
      </form>
      <button onClick={loginWithGoogle} className="button-google">
        <img src={logoGoogle} alt="logo-google" width={30} height={30} />
        <span>
          {isSignUpActive
            ? "S'inscrire avec Google"
            : "Se connecter avec Google"}
        </span>
      </button>
    </section>
  );
}
