const router = require("express").Router();
const User = require("../controllers/userController");
const { authorizationVerifiedEmail } = require("../middlewares/auth");

router.post("/login", User.login);
router.get("/count-user-on", User.countUserOnline);
router.post("/register", User.register);
router.get("/register/:id", User.findDetailEmail);
router.post(
  "/send-email",
  authorizationVerifiedEmail,
  User.sendVerificationEmail
);
router.patch("/verification-email/:id", User.verificationEmail);
router.post("/send-otp", authorizationVerifiedEmail, User.sendOtpLogin);
router.post(
  "/verification-otp",
  authorizationVerifiedEmail,
  User.verificationOtp
);
router.patch("/logout", authorizationVerifiedEmail, User.logout);

router.get("/", (req, res, next) => {
  let err = {
    status: 400,
    message: "maaf error next",
  };
  next(err);
});

module.exports = router;
