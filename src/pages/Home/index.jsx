import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./index.scss";

export default function Home() {
  return (
    <>
      <NavBar />
      <section className="container-home">
        <Header />
      </section>
      <Footer />
    </>
  );
}
