import { HashRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRoutes";
import "./App.css";
import CookieBanner from "./components/CookieBanner";

function App() {
  return (
      <Router>
        <AppRouter />
        <CookieBanner />
      </Router>
  );
}

export default App;


