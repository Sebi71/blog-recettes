/* eslint-disable react/prop-types */
import NavBar from "../../components/NavBar";
import SignInSignUp from "../../components/SignInSignUp";
import Footer from "../../components/Footer";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import "./index.scss";

export default function Connect({ user }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <NavBar />
      <SignInSignUp />
      <Footer />
    </>
  );
}
