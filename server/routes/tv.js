const router = require("express").Router();
const Tv = require("../controllers/tvController");

router.get("/search", Tv.search);
router.get("/airing-today", Tv.airingToday);
router.get("/on-air", Tv.onAir);
router.get("/popular", Tv.popular);
router.get("/top-rated", Tv.topRated);
router.get(
  "/:tvId/season/:seasonNumber/episode/:episodeNumber",
  Tv.detailEpisode
);
router.get("/:tvId/season/:seasonNumber", Tv.detailSeason);
router.get("/:tvId", Tv.detail);
router.get("/", Tv.discover);

module.exports = router;
