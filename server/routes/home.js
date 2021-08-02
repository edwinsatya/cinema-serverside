const router = require("express").Router();
const Home = require("../controllers/homeController");

router.get("/trending/:media_type/:time_window", Home.trending);
router.get("/search", Home.search);

module.exports = router;
