import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../db/firebase";
import { Link } from "react-router-dom";
import ExplainText from "../ExplainText";
import DefaultImage from "/default-img.webp";
import { Search } from "lucide-react";
import "./index.scss";

export default function HomeCard() {
  const [cookings, setCooking] = useState([]);
  const [selectCookings, setSelectCookings] = useState("Toutes");
  const [sortType, setSortType] = useState("date");

  const handleFilter = (category) => {
    setSelectCookings(category);
  };

  const sortedCookings = [...cookings].sort((a, b) => {
    if (sortType === "date") {
      return b.createdAt.toDate() - a.createdAt.toDate();
    } else if (sortType === "alphabetique") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const filterCookings = sortedCookings.filter((cooking) =>
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

  const searchCooking = (e) => {
    const value = e.target.value;
    const cookingsRef = collection(db, "cookings");

    onSnapshot(cookingsRef, (snapshot) => {
      const cookingList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const searchedCookings = cookingList.filter((cooking) =>
        cooking.name.toLowerCase().includes(value.toLowerCase())
      );

      setCooking(searchedCookings);
    });
  };

  const getFirstName = (fullName) => {
    if (!fullName) return "";
    return fullName.split(" ")[0];
  };

  return (
    <div className="global-container-home">
      <div className="global-card-home">
        <div className="btn-container-home">
          <button
            className={
              selectCookings === "Toutes"
                ? "btn-filter-active"
                : "btn-filter-home"
            }
            onClick={() => handleFilter("Toutes")}
          >
            Toutes
          </button>
          <button
            className={
              selectCookings === "Entrées"
                ? "btn-filter-active"
                : "btn-filter-home"
            }
            onClick={() => handleFilter("Entrées")}
          >
            Entrées
          </button>
          <button
            className={
              selectCookings === "Plats"
                ? "btn-filter-active"
                : "btn-filter-home"
            }
            onClick={() => handleFilter("Plats")}
          >
            Plats
          </button>
          <button
            className={
              selectCookings === "Desserts"
                ? "btn-filter-active"
                : "btn-filter-home"
            }
            onClick={() => handleFilter("Desserts")}
          >
            Desserts
          </button>
          <button
            className={
              selectCookings === "Boissons"
                ? "btn-filter-active"
                : "btn-filter-home"
            }
            onClick={() => handleFilter("Boissons")}
          >
            Boissons
          </button>
          <button
            className={
              selectCookings === "Autres"
                ? "btn-filter-active"
                : "btn-filter-home"
            }
            onClick={() => handleFilter("Autres")}
          >
            Autres
          </button>
        </div>

        <div className="btn-sort-container">
          <button 
            className= {
              sortType === "date"
                ? "btn-sort-active btn-sort"
                : "btn-sort"
            }
            onClick={() => setSortType("date")}
          >
            Trier par date d&apos;ajout
          </button>
          <button
            className= {
              sortType === "alphabetique"
                ? "btn-sort-active btn-sort"
                : "btn-sort"
            }
            onClick={() => setSortType("alphabetique")}
          >
            Trier par ordre alphabétique
          </button>
        </div>

        <div className="container-search">
          <input
            onChange={searchCooking}
            type="text"
            className="input-search"
            aria-label="Rechercher"
          />
          <div className="content-search-logo">
            <Search />
          </div>
        </div>
        {cookings.length ? (
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
                        Ajouté par {getFirstName(item.authorName)}, le{" "}
                        {formattedDate}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <ExplainText />
        )}
      </div>
    </div>
  );
}
