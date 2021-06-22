const router = require("express").Router();
const Home = require("../controllers/homeController");

router.get("/trending/:media_type/:time_window", Home.trending);

module.exports = router;
