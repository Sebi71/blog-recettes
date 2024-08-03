import { Link } from "react-router-dom";
import { User, LogOut} from "lucide-react";
import Logo from "/logo-site.webp";
import useAuth from "../../hook/useAuth";
import "./index.scss";

export default function NavBar() {
  const { user, logout } = useAuth();
  // console.log(user)

  return (
    <nav className="container-navBar">
      <Link to="/">
        <img
          src={Logo}
          width={70}
          height={70}
          alt="logo du site"
          className="logo-site"
        />
      </Link>

      {!user ? (
        <Link to="/connect" className="link-connect">
          <User className="logo-user" />
          <span className="connect-subscribe">
            Se connecter / S&apos;inscrire
          </span>
        </Link>
      ) : (
        <div className="link-connect">
          <Link  to="/dashboard" className="logout">
           {user.displayName}
          </Link>
          <div onClick={logout} className="logo-logout" title="Se déconnecter">
            <LogOut />
          </div>
        </div>
      )}
    </nav>
  );
}
