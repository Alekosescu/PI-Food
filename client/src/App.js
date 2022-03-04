import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import RecipeCreate from "./components/RecipeCreate";
import Detail from "./components/Detail";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recipes/:id" element={<Detail />} />
          <Route exact path="/recipe" element={<RecipeCreate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
