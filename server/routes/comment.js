const router = require("express").Router();
const Comment = require("../controllers/commentController");
const { authentication, authorizationComment } = require("../middlewares/auth");

router.use(authentication);
router.post("/:discusId", Comment.create);
router.get("/", Comment.find);
router.put("/:discusId/:commentId", authorizationComment, Comment.update);
router.delete("/:discusId/:commentId", authorizationComment, Comment.delete);

module.exports = router;
