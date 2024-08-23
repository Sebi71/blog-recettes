import { useFirebase } from "../../hook/useCooking";
import DefaultImage from "/default-img.webp";
import { Link } from "react-router-dom";
import { useState } from "react";
import ExplainText from "../ExplainText";

import "./index.scss";

export default function Card() {
  const { cookings, deleteCooking } = useFirebase();
  const [selectCookings, setSelectCookings] = useState("Toutes");
  const [error, setError] = useState(null);

  const handleFilter = (category) => {
    setSelectCookings(category);
  };

  const handleDelete = async (id, image, pdf) => {
    try {
      await deleteCooking(id, image, pdf);
      setError(null);
    } catch (err) {
      setError("Erreur lors de la suppression de la recette.");
      console.error(err);
    }
  };

  const sortedCookings = [...cookings].sort((a, b) => {
    return b.createdAt.toDate() - a.createdAt.toDate();
  });

  const filterCookings = sortedCookings.filter((cooking) =>
    selectCookings === "Toutes" ? true : cooking.category === selectCookings
  );

  return (
    <>
      {cookings.length ? (
        <div className="global-container">
          <div className="btn-container">
            <button
              className="btn-filter"
              onClick={() => handleFilter("Toutes")}
            >
              Toutes
            </button>
            <button
              className="btn-filter"
              onClick={() => handleFilter("Entrées")}
            >
              Entrées
            </button>
            <button
              className="btn-filter"
              onClick={() => handleFilter("Plats")}
            >
              Plats
            </button>
            <button
              className="btn-filter"
              onClick={() => handleFilter("Desserts")}
            >
              Desserts
            </button>
            <button
              className="btn-filter"
              onClick={() => handleFilter("Boissons")}
            >
              Boissons
            </button>
            <button
              className="btn-filter"
              onClick={() => handleFilter("Autres")}
            >
              Autres
            </button>
          </div>
          <div className="container-card">
            {filterCookings.map((item, idx) => (
              <div key={idx} className="content-card">
                <Link to={`/recette/${item.id}`} className="content-img">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt="image de la recette"
                      className="card-img"
                    />
                  ) : (
                    <img
                      src={DefaultImage}
                      alt="image par défault"
                      className="card-img"
                    />
                  )}
                  <div>
                    <h3 className="card-name">{item.name}</h3>
                    <p className="card-category">{item.category}</p>
                  </div>
                </Link>
                <button
                  onClick={() => handleDelete(item.id, item.image, item.pdf)}
                  className="btn-delete"
                >
                  Supprimer
                </button>
                {error && <div className="error-message">{error}</div>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ExplainText />
      )}
    </>
  );
}
