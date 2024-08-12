import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import HomeCard from "../../components/HomeCard";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import "./index.scss";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <NavBar />
      <section className="container-home">
        <Header />
        <HomeCard />
      </section>
      <Footer />
    </>
  );
}
