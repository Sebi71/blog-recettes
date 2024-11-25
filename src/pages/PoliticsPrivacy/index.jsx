import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "./index.scss";

export default function PoliticsPrivacy() {
  return (
    <>
      <NavBar />
      <section className="politics-container">
        <h1 className="politics-title">Politique de Confidentialité</h1>

        <div className="politics-content">
          <h2 className="politics-subtitle">1. Introduction</h2>
          <p>
            La présente politique de confidentialité a pour objectif de vous
            informer sur la manière dont nous collectons, utilisons, stockons et
            protégeons vos données personnelles lors de votre utilisation du
            site mon-blog-recettes.vercel.app (ci-après dénommé « le Site »). En
            utilisant le Site, vous acceptez les termes de cette politique de
            confidentialité.
          </p>
        </div>

        <div className="politics-content">
          <h2 className="politics-subtitle">
            2. Responsable du traitement des données
          </h2>
          <p>Le responsable du traitement des données personnelles est :</p>
          <ul>
            <li>Nom : Sébastien Juillet</li>
            <li>
              Adresse e-mail :{" "}
              <Link to="mailto:seb.juillet@outlook.fr">
                seb.juillet@outlook.fr
              </Link>
            </li>
          </ul>
        </div>

        <div className="politics-content">
          <h2 className="politics-subtitle">
            3. Quelles données collectons-nous ?
          </h2>
          <p>
            Nous collectons les données suivantes lors de votre utilisation du
            Site :
          </p>
          <ul>
            <li>
              Données d’inscription : pseudo, adresse e-mail et mot de passe.
            </li>
            <li>
              Données de navigation : adresse IP, cookies, pages visitées.
            </li>
            <li>
              Données liées à l&apos;utilisation du Site : recettes partagées,
              commentaires.
            </li>
          </ul>
          <p>
            Nous collectons ces informations pour vous permettre d&apos;utiliser
            pleinement le Site et d&apos;améliorer votre expérience.
          </p>
        </div>

        <div className="politics-content">
          <h2 className="politics-subtitle">
            4. Finalités de la collecte des données
          </h2>
          <p>
            Les données collectées sont utilisées pour les finalités suivantes :
          </p>
          <ul>
            <li>
              Gestion des comptes utilisateurs : création et gestion de votre
              compte utilisateur.
            </li>
            <li>
              Amélioration du service : personnalisation de votre expérience sur
              le Site, analyse de la fréquentation via Google Analytics.
            </li>
            <li>
              Sécurité : protection de votre compte et de vos informations
              personnelles.
            </li>
            <li>
              Envoi d&apos;informations : envoi d&apos;e-mails concernant votre
              compte, vos recettes ou des mises à jour du Site (seulement si
              vous avez consenti à recevoir ces informations).
            </li>
          </ul>
        </div>

        <div className="politics-content">
          <h2 className="politics-subtitle">5. Partage des données</h2>
          <p>
            Les données personnelles que vous nous fournissez ne seront pas
            partagées avec des tiers, sauf dans les cas suivants :
          </p>
          <ul>
            <li>
              Prestataires de services : nous utilisons des services tiers comme
              Firebase pour le stockage des données et Google Analytics pour
              l’analyse du trafic. Ces prestataires agissent uniquement sur nos
              instructions et sont contractuellement tenus de protéger vos
              données.
            </li>
            <li>
              Obligations légales : nous pourrions être amenés à partager vos
              informations si la loi l&apos;exige, par exemple pour se conformer
              à une demande légale ou réglementaire.
            </li>
          </ul>
        </div>

        <div className="politics-content">
          <h2 className="politics-subtitle">
            6. Durée de conservation des données
          </h2>
          <p>
            Nous conservons vos données personnelles aussi longtemps que
            nécessaire pour les finalités mentionnées ci-dessus, ou jusqu&apos;à
            ce que vous demandiez leur suppression. En cas de suppression de
            votre compte, vos données seront supprimées, sauf si leur
            conservation est requise pour des raisons légales.
          </p>
        </div>

        <div className="politics-content">
          <h2 className="politics-subtitle">7. Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez des droits suivants sur vos
            données personnelles :
          </p>
          <ul>
            <li>
              Droit d&apos;accès : vous pouvez demander à consulter les données
              personnelles que nous détenons à votre sujet.
            </li>
            <li>
              Droit de rectification : vous pouvez demander à rectifier ou
              compléter vos données personnelles si elles sont inexactes ou
              incomplètes.
            </li>
            <li>
              Droit à l&apos;effacement : vous pouvez demander à ce que vos
              données personnelles soient supprimées.
            </li>
            <li>
              Droit de limitation : vous pouvez demander la limitation du
              traitement de vos données dans certaines circonstances.
            </li>
            <li>
              Droit à la portabilité : vous pouvez demander à recevoir vos
              données dans un format structuré, couramment utilisé et lisible
              par machine.
            </li>
            <li>
              Droit d’opposition : vous pouvez vous opposer à l’utilisation de
              vos données dans certaines circonstances (par exemple, à des fins
              de marketing direct).
            </li>
          </ul>
          <p>
            Pour exercer vos droits, vous pouvez nous contacter à l’adresse
            suivante : seb.juillet@outlook.fr.
          </p>
        </div>

        <div className="politics-content">
          <h2 className="politics-subtitle">8. Utilisation des cookies</h2>
          <p>
            Le Site utilise des cookies pour améliorer votre expérience et
            analyser l’utilisation du Site. Les cookies sont des fichiers textes
            stockés sur votre appareil. Vous avez la possibilité de gérer vos
            préférences concernant l’utilisation des cookies via les paramètres
            de votre navigateur ou la bannière de consentement des cookies.
          </p>
          <p>
            <strong>Types de cookies utilisés :</strong>
          </p>
          <ul>
            <li>
              Cookies fonctionnels : nécessaires au bon fonctionnement du Site
              (par exemple, maintenir votre session ouverte).
            </li>
            <li>
              Cookies analytiques : utilisés pour collecter des informations sur
              la façon dont les utilisateurs interagissent avec le Site, via des
              services comme Google Analytics. Ces cookies permettent
              d&apos;analyser la fréquentation et d&apos;améliorer la qualité du
              Site.
            </li>
          </ul>
        </div>

        <div className="politics-content">
          <h2 className="politics-subtitle">
            9. Sécurité des données
          </h2>
          <p>
          Nous prenons toutes les mesures nécessaires pour protéger vos données personnelles contre toute perte, utilisation abusive, accès non autorisé ou divulgation. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n&apos;est totalement sécurisée, nous ne pouvons donc pas garantir une sécurité absolue.
          </p>
        </div>

        <div className="politics-content">
          <h2 className="politics-subtitle">
            10. Modifications de la politique de confidentialité
          </h2>
          <p>
          Cette politique de confidentialité peut être modifiée à tout moment. Toute modification sera publiée sur cette page, avec la date de mise à jour. Nous vous encourageons à consulter régulièrement cette politique pour vous tenir informé des changements.
          </p>
        </div>

        <div className="politics-content">
          <h2 className="politics-subtitle">
            11. Contact
          </h2>
          <p>
          Pour toute question relative à cette politique de confidentialité ou à vos données personnelles, vous pouvez nous contacter à l’adresse suivante :
          seb.juillet@outlook.fr
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
