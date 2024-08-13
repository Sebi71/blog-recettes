import { HashRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRoutes";
import "./App.css";

function App() {
  return (
      <Router>
        <AppRouter />
      </Router>
  );
}

export default App;
