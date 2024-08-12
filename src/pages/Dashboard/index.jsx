import Nav from "../../components/NavBar";
import Profil from "../../components/Profil";
import CookingList from "../../components/CookingList";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/Footer";

import "./index.scss";

export default function Dashboard() {
  useEffect(() => {
    const toastMessage = localStorage.getItem("toastMessage");
    // console.log(toastMessage);

    if (toastMessage) {
      toast.success(toastMessage);
      setTimeout(() => {
        localStorage.removeItem("toastMessage");
        // console.log("Toast message removed");
      }, 500);
    }

  }, []);

  return (
    <>
      <Nav />
      <section className="container-dashboard">
        <Profil />
        <CookingList />
      </section>
      <ToastContainer position="top-center" />
      <Footer />
    </>
  );
}
