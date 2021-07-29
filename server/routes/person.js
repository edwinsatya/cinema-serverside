const router = require("express").Router();
const Person = require("../controllers/personController");

router.get("/popular", Person.popular);

module.exports = router;
