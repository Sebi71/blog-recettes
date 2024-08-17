import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import useAuthActions from "../../hook/authActions";
import logoGoogle from "/logo-google.webp";
import "./index.scss";

export default function SignInSignUp() {
  const { loginWithGoogle, redirectIfAuth } = useAuth();

  const {
    isSignUpActive,
    formData,
    errors,
    errorsAuth,
    messageResetPassword,
    handleFormChange,
    handleInputChange,
    handleSignIn,
    handleResetPassword,
    handleFormSubmit,
  } = useAuthActions();
  

  useEffect(() => {
    redirectIfAuth();
  }, [redirectIfAuth]);
 
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

        {isSignUpActive && (
          <p className="info-password">
            Majuscule, minuscule, chiffre, caractère obligatoires
          </p>
        )}

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
          <Link to="#" onClick={handleResetPassword} className="reset-password">
            Mot de passe oublié
          </Link>
        )}

        {isSignUpActive ? (
          <Link to="#" onClick={handleFormChange} className="link">
            Déjà un compte ? Se connecter
          </Link>
        ) : (
          <Link to="#" onClick={handleFormChange} className="link">
            Pas de compte ? S&apos;inscrire
          </Link>
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
