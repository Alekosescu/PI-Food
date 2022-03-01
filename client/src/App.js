import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
