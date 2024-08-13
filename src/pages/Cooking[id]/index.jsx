import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../db/firebase";
import useAuth from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { Undo2 } from "lucide-react";
import DefaultImg from "/default-img.webp";
import "./index.scss";
import Loader from "../../components/Load";
import NotFound from "../NotFound";
import UpdateCooking from "../../components/UpdateCooking";

export default function Cooking() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [cooking, setCooking] = useState({});
  //   console.log(cooking);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const cookingId = id;
    const unsubscribe = onSnapshot(collection(db, "cookings"), (snapshot) => {
      let found = false;
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (doc.id === cookingId) {
          setCooking({ id: doc.id, ...data });
          found = true;
        }
      });
      if (!found) {
        setCooking(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!cooking) {
    return <NotFound />;
  }

  const createdAtDate = cooking.createdAt?.toDate();
  const formattedDate = createdAtDate?.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleReturn = () => {
    navigate("/dashboard");
  };

  const handleHome = () => {
    navigate("/");
  };

  function formatPreparation(preparation) {
    if (!preparation) return [];
    return preparation
      .split(".")
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 0)
      .map((sentence, index) => (
        <li key={index} className="list-style">
          {sentence}.
        </li>
      ));
  }
  

  return (
    <>
      <NavBar />
      <section className="container-cookingId">
        <div className="btn-container">
          <Undo2 onClick={handleHome} className="return-home" />
          {cooking?.authorId === user?.uid && (
            <div className="btn-admin">
                <button onClick={handleReturn} className="return-dashboard">
                  Dashboard
                </button>
                <button onClick={handleModal} className="btn-update">Modifier</button>
            </div>
          )}
        </div>
        <h1 className="title-cookingId">{cooking?.name}</h1>
        <p className="user-cookingId">
          Ajouté par : {cooking?.authorName}, le {formattedDate}
        </p>

        {cooking?.ingredients?.filter((ingredient) => ingredient.trim() !== "")
          .length > 0 && (
          <div className="content-ingredient-img">
            <div className="list-cookingId">
              {cooking?.ingredients?.map((ingredient, index) => (
                <ul key={index}>
                  <li>{ingredient}</li>
                </ul>
              ))}
            </div>
            <img
              className="img-cookingId"
              src={cooking?.image || DefaultImg}
              alt={`image de la recette ${cooking?.name}`}
            />
          </div>
        )}

        {cooking?.preparation && (
          <p className="preparation-cookingId">{formatPreparation(cooking?.preparation)}</p>
        )}

        {cooking?.pdf && (
          <div>
            <div className="pdf-preview">
              <a href={cooking?.pdf} target="_blank" rel="noopener noreferrer">
                Ouvrir le PDF dans un nouvel onglet
              </a>
            </div>
            <iframe
              src={cooking?.pdf}
              className="view-pdf"
              title="PDF Preview"
            ></iframe>
          </div>
        )}

        {cooking?.link && (
          <div className="link-cookingId">
            <p>
              Retrouver la recette{" "}
              <span className="name-cookingId">{cooking?.name}</span> sur le
              site :
            </p>
            <Link to={cooking?.link} target="_blank" rel="noopener">
              {cooking?.link}
            </Link>
          </div>
        )}
      </section>
      <UpdateCooking openModal={openModal} handleModal={handleModal} />
      <Footer />
    </>
  );
}
