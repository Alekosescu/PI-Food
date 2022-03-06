import React from "react";
import { getDetail } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Detail.css";

export default function Detail(props) {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);
  console.log("detail", props);

  const myRecipe = useSelector((state) => state.detail);

  return (
    <div>
      {myRecipe.length > 0 ? (
        <div>
          <Link to="/home">
            <button className='btn'>Back to main Page </button>{" "}
          </Link>
          <div className='imga'>
            <img src={myRecipe[0].image} alt="recipe" />
          </div>
          <div className='btn:hover'>
            <h1>{myRecipe[0].title}</h1>
          </div>
          <div className='type'>
            <h3>Summary:</h3>
            <p>{myRecipe[0].summary}</p>
          </div>
          <div className='type'>
            <h3>Instructions:</h3>
            <p>{myRecipe[0].analyzedInstructions[0]?.steps[0].step}</p>
          </div>
          <div className='type'>
            <h3>Health Score:</h3>
            <p>{myRecipe[0].healthScore}</p>
          </div>
          <div className='type'>
            <h3>Spoonacular Score:</h3>
            <p>{myRecipe[0].spoonacularScore}</p>
          </div>
          <div className='type'>
            <h3>Type Diet:</h3>
            {myRecipe[0].typeDiets?.map((diet) => (
              <p>{diet}</p>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <h2> Chargement en cours... </h2>{" "}
        </div>
      )}
    </div>
  );
}
