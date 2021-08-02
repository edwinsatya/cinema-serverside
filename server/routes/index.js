const router = require("express").Router();
const userRouter = require("./user");
const discussionRouter = require("./discussion");
const commentRouter = require("./comment");
const movieRouter = require("./movie");
const tvRouter = require("./tv");
const personRouter = require("./person");
const homeRouter = require("./home");

router.use("/users", userRouter);
router.use("/discussions", discussionRouter);
router.use("/comments", commentRouter);
router.use("/movies", movieRouter);
router.use("/tv", tvRouter);
router.use("/persons", personRouter);
router.use("/home", homeRouter);

router.use("/", (req, res) => {
  res.status(404).json({
    status: 404,
    data: "Not Found",
    message: "Url API Not Found",
  });
});

module.exports = router;
