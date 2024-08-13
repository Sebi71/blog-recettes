import "./index.scss";
import ImageCuisine from "/cuisine.webp";

export default function Header() {
  return (
    <div className="container-header">
      <h1 className="header-title">Book recettes</h1>
      <div className="header-content">
        <div className="header-content-text">
          <div className="header-content-subtitle-text">
            <h2 className="header-content-subtitle">
              Partagez et Découvrez des Recettes Délicieuses
            </h2>
            <p className="header-content-paragraphe">
              Vous aimez cuisiner et avez des recettes fantastiques à partager ?
              Ajoutez vos recettes préférées sur notre plateforme ! Que vous
              ayez concocté une création culinaire unique, trouvé une recette
              exceptionnelle sur un site de cuisine, ou que vous ayez une
              recette en format PDF sur votre ordinateur, vous pouvez facilement
              les partager avec notre communauté.
            </p>
          </div>
          <img
            src={ImageCuisine}
            alt="photo de préparation culinaire"
            width={600}
            height={300}
            className="img-cook"
            loading="lazy"
          />
        </div>
        <div>
          <h3 className="header-content-subtitle-explor">
            Explorez des Recettes de la Communauté
          </h3>
          <p className="header-content-explor">
            Découvrez une multitude de recettes partagées par d&apos;autres
            passionnés de cuisine. Que vous soyez à la recherche
            d&apos;inspiration pour un dîner rapide, un dessert décadent, ou un
            plat de fête, notre collection de recettes vous offre des options
            infinies.
          </p>
        </div>
      </div>
    </div>
  );
}

