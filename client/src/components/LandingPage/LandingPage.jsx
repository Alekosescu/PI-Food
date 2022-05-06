import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div>
      <div className='p2'>
        <h1>Bienvenue sur ma page de recette!</h1>
      </div>
      <div className='p'>
        <Link to="/home">
          <button className="buttonx">Entrer dans</button>
        </Link>
      </div>
    </div>
  );
}
