const router = require("express").Router();
const Comment = require("../controllers/commentController");
const { authentication, authorizationComment } = require("../middlewares/auth");

router.get("/", Comment.find);
router.use(authentication);
router.post("/:discusId", Comment.create);
router.put("/:commentId", authorizationComment, Comment.update);
router.delete("/:commentId", authorizationComment, Comment.delete);

module.exports = router;
