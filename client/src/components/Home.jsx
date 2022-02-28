import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes } from "../actions";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

  return (
    <div>
      <Link to="/recipe">Créez votre recette</Link>
      <h1>Bienvenue sur ma page de recette!</h1>
          <button onClick={e => { handleClick(e) }}>Recharger les recettes</button>
          <div>
              
          </div>
    </div>
  );
}
