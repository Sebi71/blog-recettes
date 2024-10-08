import { signUpSchema, signInSchema } from "../schemas/authSchemas";
import * as Yup from "yup";
import useAuth from "../hook/useAuth";
import { useState } from "react";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

const useAuthActions = () => {
  const { signUp, signIn, resetPassword } = useAuth();

  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState("");
  const [errorsAuth, setErrorsAuth] = useState("");
  const [messageResetPassword, setMessageResetPassword] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

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

  const changePassword = async (oldPassword, newPassword) => {
    if (user) {
      try {
        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        console.log("Password updated successfully");
      } catch (error) {
        console.error("Error during password update:", error);
        if (error instanceof Error) {
          if (error.message.includes("auth/invalid-credential")) {
            throw new Error("L'ancien mot de passe est incorrect.");
          } else {
            throw new Error("Une erreur inconnue s'est produite : " + error.message);
          }
        } else {
          throw new Error("Une erreur inconnue s'est produite.");
        }
      }
    } else {
      throw new Error("Utilisateur non authentifié.");
    }
  };

  return {
    isSignUpActive,
    formData,
    errors,
    errorsAuth,
    messageResetPassword,
    handleFormChange,
    handleInputChange,
    handleSignUp,
    handleSignIn,
    handleResetPassword,
    handleFormSubmit,
    changePassword,
  };
};

export default useAuthActions;
