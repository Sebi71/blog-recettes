import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../db/firebase";
import { Link } from "react-router-dom";
import ExplainText from "../ExplainText";
import DefaultImage from "/default-img.webp";

import "./index.scss";

export default function HomeCard() {
  const [cookings, setCooking] = useState([]);
  const [selectCookings, setSelectCookings] = useState("Toutes");

  const handleFilter = (category) => {
    setSelectCookings(category);
  };

  const filterCookings = cookings.filter((cooking) =>
    selectCookings === "Toutes" ? true : cooking.category === selectCookings
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cookings"), (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCooking(data);
      // console.log(data.createdAt);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="global-container-home">
      {cookings.length ? (
        <div className="global-card-home">
          <div className="btn-container-home">
            <button
              className="btn-filter-home"
              onClick={() => handleFilter("Toutes")}
            >
              Toutes
            </button>
            <button
              className="btn-filter-home"
              onClick={() => handleFilter("Entrées")}
            >
              Entrées
            </button>
            <button
              className="btn-filter-home"
              onClick={() => handleFilter("Plats")}
            >
              Plats
            </button>
            <button
              className="btn-filter-home"
              onClick={() => handleFilter("Desserts")}
            >
              Desserts
            </button>
            <button
              className="btn-filter-home"
              onClick={() => handleFilter("Boissons")}
            >
              Boissons
            </button>
            <button
              className="btn-filter-home"
              onClick={() => handleFilter("Autres")}
            >
              Autres
            </button>
          </div>
          <div className="container-card-home">
            {filterCookings.map((item, idx) => {
              const createdAtDate = item.createdAt?.toDate();
              const formattedDate = createdAtDate?.toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              return (
                <div key={idx} className="content-card-home">
                  <Link to={`/recette/${item.id}`} className="content-img-home">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt="image de la recette"
                        className="card-img-home"
                      />
                    ) : (
                      <img
                        src={DefaultImage}
                        alt="image par défaut"
                        className="card-img-home"
                      />
                    )}
                    <div>
                      <h3 className="card-name-home">{item.name}</h3>
                      <p className="card-category-home">{item.category}</p>
                      <p className="card-info-home">
                        Ajouté par {item.authorName}, le {formattedDate}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <ExplainText />
      )}
    </div>
  );
}
