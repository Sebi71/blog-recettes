import NavBar from "../../components/NavBar"
import ChangePassword from "../../components/ChangePassword"
import Footer from "../../components/Footer"
import { useEffect } from "react"
import "./index.scss"

export default function Password() {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <>
        <NavBar />
        <ChangePassword />
        <Footer />
    </>
  )
}