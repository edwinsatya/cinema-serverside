const router = require("express").Router();
const Movie = require("../controllers/movieController");

router.get("/search", Movie.search);
router.get("/discover", Movie.discover);
router.get("/detail/:movieId", Movie.detail);

module.exports = router;
