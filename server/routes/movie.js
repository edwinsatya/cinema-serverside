const router = require("express").Router();
const Movie = require("../controllers/movieController");

router.get("/search", Movie.search);
router.get("/:movieId", Movie.detail);
router.get("/", Movie.discover);

module.exports = router;
