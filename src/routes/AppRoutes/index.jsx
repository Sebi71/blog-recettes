import {Routes, Route} from "react-router-dom"
import ProtectedRoute from "../../components/ProtectedRoute"
import Home from "../../pages/Home"
import Connect from "../../pages/Connect"
import Dashboard from "../../pages/Dashboard"
import Password from "../../pages/Password"
import Cooking from "../../pages/Cooking[id]"
import Rules from "../../pages/Rules"
import NotFound from "../../pages/NotFound"

import useAuth from "../../hook/useAuth";
import "./index.scss"
import PoliticsPrivacy from "../../pages/PoliticsPrivacy"

export default function AppRoutes() {
    const {user} = useAuth()
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/connect" element={<Connect user={user} />} />
      <Route path="/dashboard" element={<ProtectedRoute user={user}><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard/password" element={<ProtectedRoute user={user}><Password /></ProtectedRoute>} />
      <Route path="/recette/:id" element={<Cooking />} />
      <Route path="/mentions-legales" element={<Rules />} />
      <Route path="/politics-privacy" element={<PoliticsPrivacy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}