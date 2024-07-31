import { Link } from "react-router-dom"
import { User } from 'lucide-react';
import Logo from "../../../public/logo-site.png"
import "./index.scss"

export default function NavBar() {
  return (
    <nav className="container-navBar">
        <Link to="/bonjour">
            <img src={Logo} width={70} height={70} alt="logo du site"  className="logo-site" />  
        </Link>
        <Link to="/connect" className="link-connect">
            <User className="logo-user"/>
            <span className="connect-subscribe">Se connecter / S&apos;inscrire</span>
        </Link>
    </nav>
  )
}