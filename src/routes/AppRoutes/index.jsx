import {Routes, Route} from "react-router-dom"
import ProtectedRoute from "../../components/ProtectedRoute"
import Home from "../../pages/Home"
import Connect from "../../pages/Connect"
import Dashboard from "../../pages/Dashboard"
import useAuth from "../../hook/useAuth";
import "./index.scss"

export default function AppRoutes() {
    const {user} = useAuth()
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/connect" element={<Connect user={user} />} />
      <Route path="/dashboard" element={<ProtectedRoute user={user}><Dashboard /></ProtectedRoute>} />
    </Routes>
  )
}