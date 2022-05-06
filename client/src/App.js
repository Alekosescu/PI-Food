import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import RecipeCreate from "./components/RecipeCreate/RecipeCreate";
import Detail from "./components/Detail/Detail";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="container">
        <div className="column">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/recipes/:id" element={<Detail />} />
            <Route path="/recipe" element={<RecipeCreate />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
