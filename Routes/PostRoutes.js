const express = require("express");
const router = express.Router();
const PostControllers = require("../controllers/PostControllers");


router.post("/CreatePost",PostControllers.CreatePost)
router.get("/GetPosts",PostControllers.GetPosts)
router.get("/GetPost/:PostID",PostControllers.GetPost)
router.put("/UpdatePost/:PostID",PostControllers.UpdatePost)
router.delete("/DeletePost/:PostID",PostControllers.DeletePost)
router.put("/likePost/:PostID",PostControllers.LikePost)
router.put("/UnlikePost/:PostID",PostControllers.UnlikePost)
router.get("/GetUsersLikedPost/:userID",PostControllers.GetUsersLikedPost)
router.get("/GetTopPosts",PostControllers.GetTopPosts)








module.exports =router