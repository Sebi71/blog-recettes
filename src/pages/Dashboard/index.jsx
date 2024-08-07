import Nav from "../../components/NavBar";
import Profil from "../../components/Profil";
import CookingList from "../../components/CookingList";
import Footer from "../../components/Footer";
import "./index.scss";

export default function Dashboard() {
  return (
    <>
      <Nav />
      <section className="container-dashboard">
        <Profil />
        <CookingList />
      </section>
      <Footer />
    </>
  );
}
