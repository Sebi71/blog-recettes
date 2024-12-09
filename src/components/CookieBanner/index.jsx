import CookieConsent from "react-cookie-consent";
// import { Cookies } from "js-cookie";
import { Link } from "react-router-dom";

import "./index.scss";

const CookieBanner = () => {
  const handleAccept = () => {
    console.log("Cookies acceptés");
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-MR1G9EJM3X";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-MR1G9EJM3X");
    };
  };

  const handleReject = () => {
    console.log("Cookies refusés");
    // Cookies.remove("user-consent");
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accepter"
      declineButtonText="Refuser"
      cookieName="user-consent"
      expires={30}
      onAccept={handleAccept}
      enableDeclineButton={true}
      onDecline={handleReject}
      // style={{
      //   background: "#2B373B",
      //   color: "#fff",
      //   fontSize: "16px",
      //   height: "100px",
      //   width:"1440px",
      //   display: "flex",
      //   flexDirection: "column",
      //   // alignItems: "center",
      //   // justifyContent: "center",
      // }}
      buttonStyle={{
        backgroundColor: "#4e8c2f",
        color: "#fff",
        fontSize: "16px",
        padding: "10px 20px",
        borderRadius: "5px",
      }}
      declineButtonStyle={{
        backgroundColor: "#f44336",
        color: "#fff",
        fontSize: "16px",
        padding: "10px 20px",
        borderRadius: "5px",
      }}
    >
      Nous utilisons des cookies pour améliorer votre expérience. En poursuivant
      votre navigation, vous acceptez notre
      <Link to="/politique-de-confidentialite" className="link-cookie">
        {" "}
        politique de confidentialité
      </Link>
      .
    </CookieConsent>
  );
};

export default CookieBanner;
