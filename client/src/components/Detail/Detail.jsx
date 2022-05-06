import React from "react";
import { getDeleteDetail, getDetail } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Detail.css";

export default function Detail(props) {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
    return function () {
      dispatch(getDeleteDetail());
    };
  }, [dispatch, id]);
  // console.log("detail", props);

  const myRecipe = useSelector((state) => state.detail); // What this does is it returns the state of the detail reducer.

  return (
    <div>
      {myRecipe.length > 0 ? (
        <div>
          <div>
            <Link to="/home">
              <div className="texto-center margon">
                <button className='butonox'>
                  Back to main Page{" "}
                </button>{" "}
              </div>
            </Link>
          </div>
          <div className="img-center">
            <img className='imagen' src={myRecipe[0].image} alt="recipe" />
          </div>
          <div>
            <h1>{myRecipe[0].title}</h1>
          </div>
          <div>
            <h3 className="texto-center">Summary:</h3>
            <p className="text">
              {myRecipe[0].summary.replace(/<\/?[^>]+(>|$)/g, "")}
            </p>
          </div>
          <div>
            <h3 className="texto-center">Instructions:</h3>
            <p className="text">
              {Array.isArray(myRecipe[0].analyzedInstructions)
                ? myRecipe[0].analyzedInstructions.map((e) =>
                    e.steps.map((f) => f.step)
                  )
                : myRecipe[0].analyzedInstructions}
            </p>
          </div>
          <div>
            <h3 className="texto-center">Health Score:</h3>
            <p className="text">{myRecipe[0].healthScore}</p>
          </div>
          <div>
            <h3 className="texto-center">Spoonacular Score:</h3>
            <p className="text">{myRecipe[0].spoonacularScore}</p>
          </div>
          <div>
            <h3 className="texto-center">Type Diet:</h3>
            <p className="text">{myRecipe[0].diets}</p>
          </div>
        </div>
      ) : (
        <div className='texty'>
          {" "}
          <h2> Chargement en cours... </h2>{" "}
        </div>
      )}
    </div>
  );
}
