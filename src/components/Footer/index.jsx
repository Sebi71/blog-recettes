import Logo from "/logo-site.webp";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { Scale, GlobeLock, ReceiptText } from "lucide-react";

import "./index.scss";

export default function Footer() {
  return (
    <footer className="container-footer">
      <div className="footer-head">
        <img
          src={Logo}
          width={70}
          height={70}
          alt="logo du site"
          className="logo-site"
        />
        <div className="content-link-footer">
          <Link className="link-contact" to="mailto:seb.juillet@outlook.fr">
            <Mail />
            <span>Contact</span>
          </Link>
          <Link className="link-contact" to="/mentions-legales">
            <Scale />
            Mentions l&eacute;gales
          </Link>
          <Link className="link-contact" to="/politique-de-confidentialite">
            <GlobeLock />
            Politique de confidentialité
          </Link>
          <Link className="link-contact" to="/CGU">
            <ReceiptText />
            Conditions Générales d&apos;Utilisation
          </Link>
        </div>
      </div>
      <span className="copyright">
        © 2024 Tous droits réservés - Sébastien Juillet
      </span>
    </footer>
  );
}
