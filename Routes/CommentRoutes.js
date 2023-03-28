const express = require("express");
const router = express.Router();
const CommentControllers = require("../controllers/CommentControllers");
const { VerifyAuth } = require("../MiddleWares/VerifyAuth");

router.post("/CreateComment/:postID",VerifyAuth , CommentControllers.CreateComment);
router.get("/GetPostComments/:postID" , CommentControllers.GetPostComments);
router.put("/UpdateComment/:commentID",VerifyAuth , CommentControllers.UpdateComment);
router.get("/GetUserComments/:userID", CommentControllers.GetUserComments);
router.delete("/DeleteComment/:commentID",VerifyAuth , CommentControllers.DeleteComment);

module.exports = router;
