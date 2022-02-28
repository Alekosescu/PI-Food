const axios = require("axios");
const { Recipe, DietType } = require("../db");
const API_KEY = process.env.API_KEY;

const apiInfo = async () => {
  const foodApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );

  const recipes = foodApi.data.results;
  const recipesIds = recipes.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.title,
      summary: recipe.summary,
      spoonacularScore: recipe.spoonacularScore,
      healthScore: recipe.healthScore,
      steps: recipe.steps,
      image: recipe.image,
      diets: recipe.diets.map(diet => diet)
    };
  });
  return recipesIds;
};

const getDBRecipes = async () => {
  return await Recipe.findAll({
    include: {
      model: DietType,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const recipes = await apiInfo();
  const dbRecipes = await getDBRecipes();
  const dbRecipesIds = await dbRecipes.concat(recipes);
  return dbRecipesIds;
};

const showAllRecipes = async (req, res) => {
  const recipes = await getAllRecipes();
  const name = req.query.name;
  if (name) {
    const recipesNames = await recipes.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    if (recipesNames) {
      res.status(200).json(recipesNames);
    } else {
      res.status(404).send("No recipes found");
    }
  } else {
    res.status(200).json(recipes);
  }
  return recipes;
};


const recipesById = async (req, res) => {
  const id = req.params.id;

  const recipesTotal = await getAllRecipes();

  if (id) {
    let recipeId = await recipesTotal.filter(
      (el) => el.id.toString() == id.toString()
    );
    if (recipeId) {
      res.status(200).send(recipeId);
    } else {
      res.status(404).send("Can't find recipe with that id");
    }
  }
};

const dietTypes = async (req, res) => {
  const diets = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
  const diet = diets.data.results.map(el => el.diets)

  const diet2 = []

  diet.map(el => {
      for(let i =0; i < el.length; i++){
          diet2.push(el[i])
      }
  })

  diet2.forEach(el => {
      if(el){
          DietType.findOrCreate({
              where: { name: el}
          })
      }
  })

  const allDiets = await DietType.findAll()
  res.json(allDiets)
}





module.exports = { showAllRecipes, recipesById, dietTypes };
