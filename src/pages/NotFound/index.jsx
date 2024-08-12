import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import imageError from "/imageError.webp";
import "./index.scss"

export default function NotFound() {
  return (
    <>
      <NavBar />
      <section className="container-notfound">
        <img 
          className="image-error" 
          src={imageError} 
          alt="image je suis désolé" />
        <p className="text-error">
          Oups ! La page que vous demandez n&apos;existe pas ou n&apos;a pas
          encore été créée !
        </p>
        <Link className="link-to-home" to="/">
          Retourner sur la page d&apos;accueil
        </Link>
      </section>
      <Footer />
    </>
  )
}