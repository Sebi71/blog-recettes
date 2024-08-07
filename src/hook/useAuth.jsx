import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../db/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

const providerGoogle = new GoogleAuthProvider();

const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, providerGoogle);
      setUser(result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const signUp = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      setUser(userCredential.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during sign up:", error);
      throw new Error(error.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during sign in:", error);
      throw new Error(error);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return "Email de réinitialisation envoyé !";
    } catch (error) {
      console.error("Error during password reset:", error);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        return;
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const redirectIfAuth = () => {
    if (user) {
      navigate("/dashboard");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return {
    user,
    loginWithGoogle,
    signUp,
    signIn,
    resetPassword,
    redirectIfAuth,
    logout,
  };
};

export default useAuth;
