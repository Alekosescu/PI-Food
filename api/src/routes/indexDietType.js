const { Router } = require("express");
const router = Router();
const { dietTypes } = require('../controllers');

router.get("/", dietTypes)

module.exports = router;
