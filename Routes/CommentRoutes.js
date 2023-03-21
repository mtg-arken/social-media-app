const express = require("express");
const router = express.Router();
const CommentControllers = require("../controllers/CommentControllers");

router.post("/CreateComment/:postID", CommentControllers.CreateComment);
router.get("/GetPostComments/:postID", CommentControllers.GetPostComments);
router.put("/UpdateComment/:commentID", CommentControllers.UpdateComment);
router.get("/GetUserComments/:userID", CommentControllers.GetUserComments);
router.delete("/DeleteComment/:commentID", CommentControllers.DeleteComment);

module.exports = router;
