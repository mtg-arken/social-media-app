const express = require("express");
const router = express.Router();
const PostControllers = require("../controllers/PostControllers");
const { VerifyAuth } = require("../MiddleWares/VerifyAuth");

router.post("/CreatePost", VerifyAuth, PostControllers.CreatePost);
router.get("/GetPosts", PostControllers.GetPosts);
router.get("/GetPost/:PostID", PostControllers.GetPost);
router.put("/UpdatePost/:PostId", VerifyAuth, PostControllers.UpdatePost);
router.delete("/DeletePost/:PostID", VerifyAuth, PostControllers.DeletePost);
router.put("/likePost/:PostID", VerifyAuth, PostControllers.LikePost);
router.get("/GetUserPosts/:userID", PostControllers.GetUserPosts);
router.get("/GetUserLikedPosts/:userID", PostControllers.GetUserLikedPosts);

router.get("/GetTopPosts", PostControllers.GetTopPosts);

module.exports = router;
