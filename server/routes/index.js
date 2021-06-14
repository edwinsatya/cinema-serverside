const router = require("express").Router();
const userRouter = require("./user");
const discussionRouter = require("./discussion");
const commentRouter = require("./comment");

router.use("/users", userRouter);
router.use("/discussion", discussionRouter);
router.use("/comment", commentRouter);

router.use("/", (req, res) => {
  res.status(404).json({
    status: 404,
    data: "Not Found",
    message: "Url API Not Found",
  });
});

module.exports = router;
