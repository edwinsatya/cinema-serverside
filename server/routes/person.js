const router = require("express").Router();
const Person = require("../controllers/personController");

router.get("/popular", Person.popular);
router.get("/:personId", Person.detail);

module.exports = router;
