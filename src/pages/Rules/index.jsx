import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import "./index.scss";

export default function Rules() {
  return (
    <>
      <NavBar />

      <section className="rules-container">
        <h1 className="rules-title">Mentions Légales</h1>

        <div className="rules-content">
          <h2 className="rules-subtitle">1. Éditeur du site</h2>
          <p>Le site mon-blog-recettes.vercel.app est édité par :</p>
          <ul>
            <li>Sébastien Juillet</li>
            <li>
              Adresse e-mail :{" "}
              <Link to="mailto:seb.juillet@outlook.fr">seb.juillet@outlook.fr</Link>
            </li>
          </ul>
        </div>

        <div className="rules-content">
          <h2 className="rules-subtitle">2. Hébergeur du site</h2>
          <p>Le site est hébergé par :</p>
          <ul>
            <li>Nom : Vercel Inc.</li>
            <li>
              Site web :{" "}
              <Link
                to="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://vercel.com
              </Link>
            </li>
          </ul>
        </div>

        <div className="rules-content">
          <h2 className="rules-subtitle">
            3. Propriété intellectuelle et partage des contenus
          </h2>
          <p>
            Les recettes partagées sur cette plateforme sont mises à disposition
            dans un esprit de partage communautaire. Elles peuvent être
            librement copiées, utilisées ou adaptées par les utilisateurs, dans
            le respect des droits des auteurs et de l’esprit collaboratif du
            site.
          </p>
        </div>

        <div className="rules-content">
          <h2 className="rules-subtitle">
            4. Collecte et traitement des données personnelles
          </h2>
          <p>Lors de l’inscription, les données suivantes sont collectées :</p>
          <ul>
            <li>
              Pseudo : utilisé pour identifier les utilisateurs sur la
              plateforme.
            </li>
            <li>
              Adresse e-mail : utilisée pour gérer l’inscription et assurer la
              sécurité des comptes.
            </li>
            <li>Mot de passe : stocké de manière sécurisée et cryptée.</li>
          </ul>
          <p>
            Ces données sont stockées sur Firebase et utilisées uniquement pour
            le bon fonctionnement de la plateforme. Les utilisateurs disposent
            d’un droit d’accès, de rectification et de suppression de leurs
            données personnelles, en écrivant à l’adresse e-mail mentionnée
            ci-dessus.
          </p>
        </div>

        <div className="rules-content">
          <h2 className="rules-subtitle">5. Cookies</h2>
          <p>Le site utilise des cookies pour :</p>
          <ul>
            <li>Garantir la sécurité de votre session utilisateur.</li>
            <li>Faciliter l&apos;expérience utilisateur sur la plateforme.</li>
          </ul>
          <p>Le site utilise Google Analytics pour analyser la fréquentation. Ces cookies permettent de collecter des informations anonymes sur les pages visitées. Vous pouvez à tout moment gérer vos préférences via la bannière de cookies ou les paramètres de votre navigateur.</p>
          <p>Aucun cookie publicitaire n&apos;est utilisé.</p>
        </div>

        <div className="rules-content">
          <h2 className="rules-subtitle">6. Responsabilité</h2>
          <p>
            L’éditeur met tout en œuvre pour garantir la fiabilité des
            informations et services proposés sur le site. Cependant, aucune
            garantie n&apos;est donnée quant à l’exactitude des contenus soumis
            par les utilisateurs.
          </p>
        </div>

        <div className="rules-content">
          <h2 className="rules-subtitle">
            7. Modération et contenu utilisateur
          </h2>
          <p>
            Les utilisateurs s’engagent à ne pas publier de contenus illégaux,
            offensants ou inappropriés. L’éditeur se réserve le droit de
            supprimer tout contenu ne respectant pas ces conditions.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
