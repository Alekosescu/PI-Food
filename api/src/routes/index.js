const { Router } = require("express");
const routeFood = require("./indexFood.js");
const routeDiet = require("./indexDietType.js");
const recipe = require("./recipe.js");

const router = Router();

router.use("/recipes", routeFood);
router.use("/types", routeDiet);
router.use("/recipe", recipe);

module.exports = router;
