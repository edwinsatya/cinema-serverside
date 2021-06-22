const router = require("express").Router();
const Movie = require("../controllers/movieController");

router.get("/search", Movie.search);
router.get("/now-playing", Movie.nowPlaying);
router.get("/popular", Movie.popular);
router.get("/top-rated", Movie.topRated);
router.get("/upcoming", Movie.upcoming);
router.get("/:movieId", Movie.detail);
router.get("/", Movie.discover);

module.exports = router;
