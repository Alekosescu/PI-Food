const { Router } = require("express");
const { Recipe, DietType } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => { 
  let {
    name,
    summary,
    spoonacularScore,
    healthScore,
    steps,
    image,
    createdAtDb,
    typeDiets,
  } = req.body;  
  try {
    let createRecipe = await Recipe.create({
      name,
      summary,
      spoonacularScore,
      healthScore,
      steps,
      image,
      createdAtDb,
    });
    let dietTypeDb = await DietType.findAll({ where: { name: typeDiets } });
    createRecipe.addDietType(dietTypeDb);
    res.status(200).send("Your recipe has been created!");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
