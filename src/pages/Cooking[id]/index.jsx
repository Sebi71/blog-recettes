import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../db/firebase";
import { useNavigate } from "react-router-dom";
import { Undo2 } from "lucide-react";
import DefaultImg from "../../../public/default-img.webp";

import "./index.scss";

export default function Cooking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cooking, setCooking] = useState({});
  console.log(cooking.name);

  useEffect(() => {
    const cookingId = id;
    const unsubscribe = onSnapshot(collection(db, "cookings"), (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (doc.id === cookingId) {
          setCooking({ id: doc.id, ...data });
        }
      });
    });
    return () => unsubscribe();
  }, [id]);

  const createdAtDate = cooking.createdAt?.toDate();
  const formattedDate = createdAtDate?.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleReturn = () => {
    navigate("/dashboard");
  };

  if (!cooking) {
    return <div>Recette introuvable</div>;
  }

  return (
    <>
      <NavBar />
      <section className="container-cookingId">
        <Undo2 onClick={handleReturn} className="return-dashboard" />
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
          <p className="preparation-cookingId">{cooking?.preparation}</p>
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
            <p>Retrouver la recette <span className="name-cookingId">{cooking?.name}</span> sur le site :</p>
            <Link to={cooking?.link} target="_blank" rel="noopener">
              {cooking?.link}
            </Link>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
