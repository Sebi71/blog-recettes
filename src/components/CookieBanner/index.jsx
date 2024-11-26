import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import "./index.scss"; 


const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookiesConsent = localStorage.getItem("cookiesConsent");
    if (!cookiesConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesConsent", "true");
    setShowBanner(false);
  };

  const handleReject = () => {
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <p>
        Nous utilisons des cookies pour améliorer votre expérience. En poursuivant votre navigation, vous acceptez notre{" "}
        <Link to="/politique-de-confidentialite">politique de confidentialité</Link>.
      </p>
      <div className="cookie-actions">
        <button onClick={handleAccept} className="cookie-accept">
          Accepter
        </button>
        <button onClick={handleReject} className="cookie-reject">
          Refuser
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
