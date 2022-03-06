import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div>
      <div className='type'>
        <h1>Bienvenue sur ma page de recette!</h1>
        <Link to="/home">
          <button>Entrer dans</button>
        </Link>
      </div>
    </div>
  );
}
