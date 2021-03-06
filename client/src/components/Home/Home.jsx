import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getRecipes,
  filterRecipesByTypeDiet,
  orderByName,
  orderByPunctuation,
} from "../../actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";
import './HomeRecharge.css';

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  const [orden, setOrden] = useState("");
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexLastRecipe = currentPage * recipesPerPage;
  const indexFirstRecipe = indexLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handleFilterByTypeDiet(e) {
    dispatch(filterRecipesByTypeDiet(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`ordenado ${e.target.value}`);
  }

  function handlePunctuation(e) {
    e.preventDefault();
    dispatch(orderByPunctuation(e.target.value));
    setCurrentPage(1);
    setOrder(`ordenado ${e.target.value}`);
  }

  return (
    <div className="container-fluid">
      <div>
        <div className="padel textito">
          <h1>Bienvenue sur ma page de recette!</h1>
        </div>
        <nav>
          <div className="padel">
            <Link type="button" to="/recipe">
              <button className='buttonix'>Créez votre recette</button>
            </Link>
          </div>
          <div>
            <div>
              <div>
                <div className="navbar navbar-expand-lg justify-content-around padel">
                  <div className="dropdown-form">
                    <select className="boxy1" onChange={(e) => handleSort(e)}>
                      <option value="asc">Ascendant</option>
                      <option value="desc">Descendant</option>
                    </select>
                  </div>

                  <div>
                    <SearchBar />
                  </div>

                  <div>
                    <select
                      className="boxy2"
                      onChange={(e) => handlePunctuation(e)}
                    >
                      <option value="Mamenor">
                        Le plus élevé au score le plus bas
                      </option>
                      <option value="Memayor">
                        Score le plus bas au plus haut
                      </option>
                    </select>
                  </div>

                  <div>
                    <select
                      className="boxy1"
                      onChange={(e) => handleFilterByTypeDiet(e)}
                    >
                      <option value="All">All recipes</option>
                      <option value="gluten free">Gluten Free</option>
                      <option value="ketogenic">Ketogenic</option>
                      <option value="vegetarian">Vegetarian </option>
                      <option value="lacto-vegetarian">
                        Lacto-Vegetarian{" "}
                      </option>
                      <option value="lacto ovo vegetarian">
                        Ovo-Vegetarian
                      </option>
                      <option value="vegan">Vegan</option>
                      <option value="pescatarian">Pescatarian</option>
                      <option value="paleolithic">Paleolithic</option>
                      <option value="primal">Primal</option>
                      <option value="whole 30">Whole 30</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div>
          <Paginado
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginado={paginado}
          />
        </div>
      </div>

      <div className="padel">
        <button
          className="buttonox"
          type="button"          
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Recharger les recettes
        </button>
      </div>

      <div className="cartoneta">
        {currentRecipes?.map((e, key) => {
          return (
            <div className="cart">
              <Link
                to={"/recipes/" + e.id}
                key={key}
                style={{ textDecoration: "none", color: "none" }}
              >
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
