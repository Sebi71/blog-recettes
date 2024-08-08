import {Routes, Route} from "react-router-dom"
import ProtectedRoute from "../../components/ProtectedRoute"
import Home from "../../pages/Home"
import Connect from "../../pages/Connect"
import Dashboard from "../../pages/Dashboard"
import Password from "../../pages/Password"

import useAuth from "../../hook/useAuth";
import "./index.scss"

export default function AppRoutes() {
    const {user} = useAuth()
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/connect" element={<Connect user={user} />} />
      <Route path="/dashboard" element={<ProtectedRoute user={user}><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard/password" element={<ProtectedRoute user={user}><Password /></ProtectedRoute>} />
      {/* <Route path="/dashboard/add-cooking" element={<ProtectedRoute user={user}><AddCooking /></ProtectedRoute>} /> */}
    </Routes>
  )
}