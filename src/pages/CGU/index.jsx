import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "./index.scss";

export default function CGU() {
  return (
    <>
      <NavBar />
      <section className="CGU-container">
        <h1 className="CGU-title">
          Conditions Générales d&apos;Utilisation (CGU)
        </h1>
        <p>
          <strong>Dernière mise à jour :</strong> 26/11/2024
        </p>
        <p>
          Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent
          l&apos;accès et l&apos;utilisation du site{" "}
          <strong>mon-blog-recettes.vercel.app</strong> (ci-après « le Site »),
          accessible à l&apos;adresse{" "}
          <Link to={"https://mon-blog-recettes.vercel.app/"}>
            https://mon-blog-recettes.vercel.app/
          </Link>
          . En accédant ou en utilisant le Site, vous acceptez sans réserve les
          présentes CGU. Si vous n&apos;acceptez pas ces conditions, vous devez
          cesser immédiatement d&apos;utiliser le Site.
        </p>

        <div className="CGU-content">
          <h2 className="CGU-subtitle">1. Définitions</h2>
          <ul>
            <li>
              Utilisateur : Toute personne qui utilise le Site, soit en tant que
              visiteur, soit en tant qu&apos;utilisateur inscrit.
            </li>
            <li>
              Site : Le blog <strong>mon-blog-recettes.vercel.app</strong>,
              accessible à l&apos;adresse{" "}
              <Link to={"https://mon-blog-recettes.vercel.app/"}>
                https://mon-blog-recettes.vercel.app/
              </Link>
              , permettant à ses utilisateurs de partager des recettes
              culinaires et d&apos;interagir avec d&aposautres utilisateurs.
            </li>
          </ul>
        </div>

        <div className="CGU-content">
          <h2 className="CGU-subtitle">2. Accès au site</h2>
          <p>
            Le Site est accessible gratuitement à toute personne disposant
            d&apos;une connexion internet. Cependant, l&apos;accès à certaines
            fonctionnalités (création de compte, ajout de recettes, etc.) peut
            nécessiter une inscription préalable. L&apos;utilisateur est
            responsable de l’obtention et du maintien des équipements
            nécessaires pour accéder au Site (ordinateur, smartphone, connexion
            Internet, etc.).
          </p>
        </div>

        <div className="CGU-content">
          <h2 className="CGU-subtitle">3. Inscription et création de compte</h2>
          <p>
            L&apos;inscription sur le Site nécessite la création d&apos;un
            compte utilisateur en fournissant certaines informations
            personnelles, notamment un pseudonyme, une adresse e-mail et un mot
            de passe. L&apos;utilisateur s&apos;engage à fournir des
            informations exactes et à les mettre à jour si nécessaire. Il est de
            la responsabilité de l&apos;Utilisateur de protéger son mot de passe
            et d&apos;éviter toute utilisation non autorisée de son compte.
            L&apos;Utilisateur s&apos;engage à informer immédiatement
            l&apos;équipe du Site en cas de suspicion d’utilisation frauduleuse
            de son compte.
          </p>
        </div>

        <div className="CGU-content">
          <h2 className="CGU-subtitle">4. Utilisation du site</h2>
          <p>
            En tant qu&apos;Utilisateur, vous vous engagez à respecter les
            règles suivantes :
          </p>
          <ul>
            <li>
              Contenu : Vous êtes seul responsable des recettes que vous
              partagez et vous devez vous assurer que celles-ci respectent les
              lois en vigueur (propriété intellectuelle, droits d’auteur, etc.).
            </li>
            <li>
              Respect des autres utilisateurs : Vous devez respecter les autres
              utilisateurs du Site, en particulier en ce qui concerne les
              commentaires et les interactions sur le Site. Le harcèlement, les
              insultes, et tout comportement nuisible ou illégal ne sont pas
              tolérés.
            </li>
            <li>
              Interdiction de contenu illicite : Vous vous engagez à ne pas
              publier de contenu qui pourrait violer la loi ou les droits
              d&apos;autrui (discriminations, incitation à la haine, contenu
              pornographique, etc.).
            </li>
          </ul>
        </div>

        <div className="CGU-content">
          <h2 className="CGU-subtitle">5. Propriété intellectuelle</h2>
          <p>
            Le contenu que vous publiez sur le Site (recettes, images,
            commentaires, etc.) reste votre propriété, mais vous accordez au
            Site une licence mondiale, non exclusive, gratuite, et transférable
            pour utiliser, reproduire, adapter et afficher ce contenu dans le
            cadre de l&apos;exploitation du Site. Le contenu du Site, incluant
            notamment les textes, images, logos, et autres éléments, est protégé
            par les droits de propriété intellectuelle et est la propriété de
            l’éditeur du Site ou de ses partenaires.
          </p>
        </div>

        <div className="CGU-content">
          <h2 className="CGU-subtitle">6. Responsabilité</h2>
          <p>
            L&apos;éditeur du Site ne saurait être tenu responsable des erreurs,
            omissions ou contenus illicites publiés par les utilisateurs. Il
            s&apos;engage néanmoins à retirer toute information illégale
            signalée par les utilisateurs. Le Site peut contenir des liens vers
            des sites tiers. L&apos;éditeur du Site n&apos;est pas responsable
            du contenu de ces sites et n&apos;assume aucune responsabilité
            concernant l&apos;accès à ces derniers.
          </p>
        </div>

        <div className="CGU-content">
          <h2 className="CGU-subtitle">7. Suspension et résiliation</h2>
          <p>
            L&apos;éditeur du Site se réserve le droit de suspendre ou de
            résilier le compte d&apos;un utilisateur qui ne respecterait pas les
            présentes CGU, notamment en cas de publication de contenu illicite
            ou nuisible.
          </p>
        </div>

        <div className="CGU-content">
          <h2 className="CGU-subtitle">8. Données personnelles</h2>
          <p>
            La collecte et le traitement des données personnelles des
            utilisateurs sont régis par la politique de confidentialité
            disponible <Link to={"/politique-de-confidentialite"}>[ici]</Link>{" "}
            (lien vers la politique de confidentialité).
          </p>
        </div>

        <div className="CGU-content">
          <h2 className="CGU-subtitle">9. Cookies</h2>
          <p>
            Le Site utilise des cookies pour améliorer l&apos;expérience
            utilisateur et analyser l’utilisation du Site. En utilisant le Site,
            vous acceptez l&apos;utilisation de cookies, conformément à la
            politique de cookies. Vous pouvez gérer vos préférences via les
            paramètres de votre navigateur.
          </p>
        </div>

        <div className="CGU-content">
          <h2 className="CGU-subtitle">10. Modification des CGU</h2>
          <p>
            L&apos;éditeur du Site se réserve le droit de modifier les présentes
            CGU à tout moment. Les utilisateurs seront informés de toute
            modification significative par une mise à jour de cette page. En
            continuant à utiliser le Site après ces modifications, vous acceptez
            les nouvelles conditions.
          </p>
        </div>

        <div className="CGU-content">
          <h2 className="CGU-subtitle">
            11. Loi applicable et juridiction compétente
          </h2>
          <p>
            Les présentes CGU sont régies par la loi française. En cas de
            litige, les tribunaux compétents seront ceux du lieu où réside
            l&apos;utilisateur, conformément à la législation applicable.
          </p>
        </div>

        <div className="CGU-content">
          <h2 className="CGU-subtitle">12. Contact</h2>
          <p>
            Pour toute question relative aux présentes CGU, vous pouvez nous
            contacter à l’adresse suivante : seb.juillet@outlook.fr
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
