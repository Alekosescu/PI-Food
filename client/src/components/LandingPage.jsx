import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className='landing'>
      <div>
        <h1 className='logo-1 body-landing'>Bienvenue sur ma page de recette!</h1>
        <Link to="/home">
          <button className='button button::after button:hover button:active' >Entrer dans</button>
        </Link>
      </div>
    </div>
  );
}
