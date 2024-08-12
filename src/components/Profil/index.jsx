import useAuth from "../../hook/useAuth";
import { Link } from "react-router-dom";
import { Mail, User, KeyRound } from "lucide-react";
import "./index.scss";

export default function Profil() {
  const { user } = useAuth();
  // console.log(user);

  return (
    <div className="container-profil">
      <div className="content-profil">
        <h1 className="profil-title">Profil utilisateur</h1>
        <h2 className="profil-subtitle">Votre profil</h2>
      </div>
      <div>
        <ul className="content-list">
          <li className="list-item">
            <span>
              <User />
            </span>
            <span>
              <b>Votre nom : </b> {user?.displayName}
            </span>
          </li>
          <li className="list-item">
            <span>
              <Mail />
            </span>
            <span>
              <b>Votre mail : </b>
              {user?.email}
            </span>
          </li>
          <li>
            <Link to="/dashboard/password" className="list-item link-item">
              <span>
                <KeyRound />
              </span>
              <span>
                <b>Changer de mot de passe </b>
              </span>
            </Link>
          </li>
          <li>
            <span className="member-date">
              Membre depuis le{" "}
              {user?.metadata?.creationTime
                ? new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "full",
                  }).format(new Date(user?.metadata?.creationTime))
                : "Date inconnue"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
