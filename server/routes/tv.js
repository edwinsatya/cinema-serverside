const router = require("express").Router();
const Tv = require("../controllers/tvController");

router.get("/search", Tv.search);
router.get("/:tvId", Tv.detail);
router.get("/", Tv.discover);

module.exports = router;
