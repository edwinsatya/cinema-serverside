const router = require("express").Router();
const User = require("../controllers/userController");

router.post("/login", User.login);
router.patch("/verification/:id", User.verificationEmail);
router.post("/register", User.register);

router.get("/", (req, res, next) => {
  let err = {
    status: 400,
    message: "maaf error next",
  };
  next(err);
});

module.exports = router;
