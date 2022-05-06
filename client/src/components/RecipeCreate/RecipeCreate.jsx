import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postRecipes, getTypeDiet } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "./RecipeCreate.css";

function controlForm(input) {
  const reg = new RegExp("^[0-9]+$");
  let errors = {};
  if (!input.name) errors.name = "please choose a name for the recipe";
  if (!input.summary) errors.summary = "please put the summary of the recipe";
  if (
    input.spoonacularScore < 0 ||
    input.spoonacularScore > 100 ||
    !reg.test(input.spoonacularScore) // !reg.test is a regular expression that checks if the input is a number.
  )
    errors.spoonacularScore = "put a punctuation between 0-100";
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
  let listDiets = useSelector((state) => state.typeDiets);
  // console.log("diets", listDiets);
  const [errors, setErrors] = useState({}); // This is for the form validation
  const [input, setInput] = useState({
    name: "",
    summary: "",
    spoonacularScore: "",
    healthScore: "",
    analyzedInstructions: "",
    image: "",
    typeDiets: [],
  });

  useEffect(() => {
    // useEffect is used to fetch the data from the server.
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
    alert("Félicitations, vous avez créé une nouvelle recette !");
    setInput({
      name: "",
      summary: "",
      spoonacularScore: "",
      healthScore: "",
      steps: "",
      image: "",
      typeDiets: [],
      createdAtDb: "",
    });
    console.log("input", input);
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
        <div>
          <Link to="/home">
            <div className="margen">
              <button type="button" className="buttonax">
                Retour à la page principale
              </button>
            </div>
          </Link>
        </div>
        <div className="cardCreate text1">
          <h1>Créez votre recette</h1>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div>
              <div className="text1">
                <div>
                  <label>Nom:</label>
                </div>
                <div>
                  <input
                    className="inputo"
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  {errors.name && <p>{errors.name}</p>}
                </div>
              </div>
              <div className="text1">
                <div>
                  <label>Sommaire:</label>
                </div>
                <input
                  className="inputo"
                  type="text"
                  name="summary"
                  value={input.summary}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                {errors.summary && <p>{errors.summary}</p>}
              </div>
              <div className="text1">
                <div>
                  <label>Ponctuation:</label>
                </div>
                <input
                  className="inputo"
                  type="text"
                  name="spoonacularScore"
                  value={input.spoonacularScore}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                {errors.spoonacularScore && <p>{errors.spoonacularScore}</p>}
              </div>
              <div className="text1">
                <div>
                  <label>santéScore:</label>
                </div>
                <input
                  className="inputo"
                  type="text"
                  name="healthScore"
                  value={input.healthScore}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                {errors.healthScore && <p>{errors.healthScore}</p>}
              </div>
              <div className="text1">
                <div>
                  <div>
                    <label>Pas à pas:</label>
                  </div>
                  <input
                    className="inputo"
                    type="text"
                    name="analyzedInstructions"
                    value={input.analyzedInstructions}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  {errors.analyzedInstructions && (
                    <p>{errors.analyzedInstructions}</p> // This is for the form validation on the server side (in the controller) if the field is empty
                  )}
                </div>
                <div className="text1">
                  <div>
                    <label>Image:</label>
                  </div>
                  <input
                    className="inputo"
                    type="text"
                    name="image"
                    value={input.image}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                {errors.image && <p>{errors.image}</p>}
              </div>
              <div>
                <select className="boxy" onChange={(e) => handleSelect(e)}>
                  {listDiets.map((diet) => (
                    <option key={diet.id} value={diet.name}>
                      {diet.name}
                    </option>
                  ))}
                </select>
                {errors.hasOwnProperty("name") ||
                errors.hasOwnProperty("summary") ||
                errors.hasOwnProperty("spoonacularScore") ||
                errors.hasOwnProperty("healthScore") ? (
                  <p>
                    Veuillez remplir toutes les entrées pour créer votre recette
                  </p>
                ) : (
                  <button className="botonazo2" type="submit">
                    Créer une recette
                  </button>
                )}
              </div>
            </div>
          </form>
          <div className="hot">
            {input.typeDiets.map((e) => (
              <div>
                <div>
                  <p className="hot">{e}</p>
                </div>
                <button onClick={() => handleDelete(e)}>
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
