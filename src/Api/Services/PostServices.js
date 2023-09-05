const Post = require("../Models/PostModel");
const PostLike = require("../Models/PostLikeModel");

const mongoose = require("mongoose");

const FindPostByOwnerIdService = (OwnerId) => {
  return Post.find({ Owner: OwnerId }).sort("-createdAt");
};
const FindTopPosts = () => {
  return Post.find()
    .sort({ likeCount: "desc" })
    .limit(3)
    .populate("Owner", "-password")
    .lean();
};
const FindPostById = (id) => {
  return Post.findById(id).populate("Owner", "-password").lean();
};
const FindPostByOwnerId = (userID) => {
  return Post.find({ Owner: userID }).populate("Owner", "-password");
};
const FindPosts = (sortBy) => {
  switch (sortBy) {
    case "latest":
      return Post.find()
        .sort("createdAt")
        .populate("Owner", "-password")
        .lean();

    case "comments":
      return Post.find()
        .sort("commentsCount")
        .populate("Owner", "-password")
        .lean();

    case "likes":
      return Post.find()
        .sort("-likeCount")
        .populate("Owner", "-password")
        .lean();

    case "earliest":
      return Post.find()
        .sort("-createdAt")
        .populate("Owner", "-password")
        .lean();

    default:
      return Post.find().populate("Owner", "-password").lean();
  }
};
const FindUserLikedPosts = (userId) => {
  return PostLike.find({ Owner: userId }).populate({
    path: "post",
    populate: { path: "Owner", select: "-password" },
  });
};
const FindUserLikedPost = (postID, userId) => {
  return PostLike.find({ post: postID, user: userId });
};
const DeleteUserLike = (postID, userId) => {
  return PostLike.findOneAndDelete({ post: postID, user: userId });
};
const UpdatePostLike = (postID, Like) => {
  return Post.findByIdAndUpdate(
    postID,
    { $inc: { likeCount: Like } },
    { new: true }
  )
    .populate("Owner", "-password")
    .lean();
};
const DeletePostLikes = (postID) => {
  return PostLike.deleteMany({ post: postID });
};
const UpdatePostContent = (postId, content) => {
  return Post.findByIdAndUpdate(postId, { content: content }, { new: true })
    .populate("Owner", "-password")
    .lean();
};
const DecreasePostCommentsCount=(postID)=>{
  return Post.findByIdAndUpdate(postID, {
    $inc: { commentsCount: -1 },
  });
}
const CreatePost=(userId,title,content)=>{
  return Post.create({
    Owner: userId.id,
    title: title,
    content: content,
  });
}
const CreatePostLike=(postID,userId)=>{
  return PostLike.create({ post: postID, user: userId });
}
module.exports = {
  FindPostByOwnerIdService,
  FindTopPosts,
  FindPostById,
  FindPostByOwnerId,
  FindPosts,
  FindUserLikedPosts,
  FindUserLikedPost,
  DeleteUserLike,
  UpdatePostLike,
  DeletePostLikes,
  UpdatePostContent,
  DecreasePostCommentsCount,CreatePost,CreatePostLike

};
