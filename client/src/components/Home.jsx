import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes } from "../actions";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  const [search, setSearch] = useState("");
  const [orden, setOrden] = useState("");
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setrecipesPerPage] = useState(9);
  const indexLastRecipe = currentPage * recipesPerPage;
  const indexFirstRecipe = indexLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);

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
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Recharger les recettes
      </button>
      <div>
        <select>
          <option value="asc">Ascendant</option>
          <option value="desc">Descendant</option>
        </select>
        <select>
          <option value="Mamenor">Le plus élevé au score le plus bas</option>
          <option value="Memayor">Score le plus bas au plus haut</option>
        </select>
        <select>
          <select>
            <option value="All">All recipes</option>
            <option value="gluten free">Gluten Free</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="vegetarian">Vegetarian </option>
            <option value="lacto-vegetarian">Lacto-Vegetarian </option>
            <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="primal">Primal</option>
            <option value="whole 30">Whole 30</option>
          </select>
        </select>
        {currentRecipes?.map((e) => {
          return (
            <Link to={"/recipes/" + e.id}>
              <Card
                name={e.name}
                image={e.image}
                typeDiets={
                  e.diets
                    ? e.diets
                    : e.typeDiets && e.typeDiets.map((e) => e.name)
                }
                key={e.id}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
