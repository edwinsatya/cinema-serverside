const router = require("express").Router();
const Movie = require("../controllers/movieController");

router.get("/search", Movie.search);
router.get("/discover", Movie.discover);

module.exports = router;
