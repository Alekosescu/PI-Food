const { Router } = require("express");
const { showAllRecipes, recipesById } = require("../controllers");
const router = Router();

router.get("/", showAllRecipes);
router.get("/:id", recipesById);

module.exports = router;
