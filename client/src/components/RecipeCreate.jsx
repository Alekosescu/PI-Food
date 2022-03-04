import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postRecipes, getTypeDiet } from "../actions";
import { useDispatch, useSelector } from "react-redux";

function controlForm(input) {
  const reg = new RegExp("^[0-9]+$");
  let errors = {};
  if (!input.title) errors.title = "please put the title of the recipe";
  if (!input.summary) errors.summary = "please put the summary of the recipe";
  if (
    input.spoonacularScore < 0 ||
    input.spoonacularScore > 100 ||
    !reg.test(input.spoonacularScore)
  )
    errors.spoonacularScore = "put a puntuation between 0-100";
  if (
    input.healthScore < 0 ||
    input.healthScore > 100 ||
    !reg.test(input.healthScore)
  )
    errors.healthScore = "put a healthScore between 0-100";
  if (!input.image) {
    errors.image = "please put an image";
  }
  return errors;
}

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let listDiets = useSelector((state) => state.typediets);
  console.log("diets", listDiets);
  const [errors, setErrors] = useState({}); // This is for the form validation
  const [input, setInput] = useState({
    title: "",
    summary: "",
    spoonacularScore: "",
    healthScore: "",
    analyzedInstructions: "",
    image: "",
    typeDiets: [],
  });

  useEffect(() => {
    dispatch(getTypeDiet());
  }, [dispatch]);
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      controlForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      typeDiets: [...input.typeDiets, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postRecipes(input));
    alert("Félicitations, vous avez créé une nouvelle recette !");
    setInput({
      title: "",
      summary: "",
      spoonacularScore: "",
      healthScore: "",
      analyzedInstructions: "",
      image: "",
      typeDiets: [],
    });
    navigate("/home");
  }

  function handleDelete(e) {
    setInput({
      ...input,
      typeDiets: input.typeDiets.filter((diet) => diet !== e),
    });
  }

  return (
    <div>
      <div>
        <Link to="/home">
          <button>Retour à la page principale</button>
        </Link>
        <h1>Créez votre recette</h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div>
            <label>Nom:</label>
            <input
              type="text"
              name="title"
              value={input.title}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {errors.title && <p>{errors.title}</p>}
          </div>
          <div>
            <label>Sommaire:</label>
            <input
              type="text"
              name="summary"
              value={input.summary}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {errors.summary && <p>{errors.summary}</p>}
          </div>
          <div>
            <label>Ponctuation:</label>
            <input
              type="text"
              name="spoonacularScore"
              value={input.spoonacularScore}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {errors.spoonacularScore && <p>{errors.spoonacularScore}</p>}
          </div>
          <div>
            <label>santéScore:</label>
            <input
              type="text"
              name="healthScore"
              value={input.healthScore}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {errors.healthScore && <p>{errors.healthScore}</p>}
          </div>
          <div>
            <label>Image:</label>
            <input
              type="text"
              name="image"
              value={input.image}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {errors.image && <p>{errors.image}</p>}
          </div>
          <div>
            <label>Pas à pas:</label>
            <input
              type="text"
              name="analyzedInstructions"
              value={input.analyzedInstructions}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <select onChange={(e) => handleSelect(e)}>
            {listDiets?.map((t) => {
              return <option key={t.id}>{t.name}</option>;
            })}
          </select>
          {errors.hasOwnProperty("title") ||
          errors.hasOwnProperty("summary") ||
          errors.hasOwnProperty("spoonacularScore") ||
          errors.hasOwnProperty("healthScore") ? (
            <p>Veuillez remplir toutes les entrées pour créer votre recette</p>
          ) : (
            <button type="submit">Créer une recette</button>
          )}
        </form>

        {input.typeDiets.map((e) => {
          return (
            <div>
              <h5>{e}</h5>
              <button onClick={() => handleDelete(e)}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
