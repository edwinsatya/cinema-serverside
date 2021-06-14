const router = require("express").Router();
const Discussion = require("../controllers/discussionController");
const {
  authentication,
  authorizationDiscussion,
} = require("../middlewares/auth");

router.get("/", Discussion.find);
router.use(authentication);
router.post("/", Discussion.create);
router.put("/:discusId", authorizationDiscussion, Discussion.update);
router.delete("/:discusId", authorizationDiscussion, Discussion.delete);

module.exports = router;
