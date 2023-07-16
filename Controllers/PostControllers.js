const mongoose = require("mongoose");
const Post = require("../Models/PostModel");
const Comment = require("../Models/CommentModel");
const PostLike = require("../Models/PostLikeModel");
const jwt = require("jsonwebtoken");

const cooldownPost = new Set();
const cooldownLike = new Set();

//get posts of specific user
const GetPosts = async (req, res) => {
  try {
    const { page, sortBy, author, search, liked } = req.query;

    let posts;
    switch (sortBy) {
      case "latest":
        posts = await Post.find()
          .sort("createdAt")
          .populate("Owner", "-password")
          .lean();
        break;
      case "comments":
        posts = await Post.find()
          .sort("commentsCount")
          .populate("Owner", "-password")
          .lean();
        break;
      case "likes":
        posts = await Post.find()
          .sort("-likeCount")
          .populate("Owner", "-password")
          .lean();
        break;
      case "earliest":
        posts = await Post.find()
          .sort("-createdAt")
          .populate("Owner", "-password")
          .lean();
        break;

      default:
        posts = await Post.find().populate("Owner", "-password").lean();
        break;
    }


    return res.status(200).json({ data: posts });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const CreatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = jwt.decode(req.cookies.RefreshToken);

    if (!title && !content && !userId.id) {
      throw new Error("missing fields");
    }
    TestValidIP(userId.id);
    if (cooldownPost.has(userId.id)) {
      throw new Error("your doing too much requests , wait 1 min");
    }
    cooldownPost.add(userId.id);
    setTimeout(() => {
      cooldownPost.delete(userId.id);
    }, 60000);

    const newPost = await Post.create({
      Owner: userId.id,
      title: title,
      content: content,
    });

    return res.status(200).json({ data: newPost });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const UpdatePost = async (req, res) => {
  try {
    let postId = req.params.PostId;
    const { content, id } = req.body;

    if (postId === "undefined") postId = id;

    if (!content) {
      throw new Error("missing fields");
    }
    const userId = jwt.decode(req.cookies.RefreshToken);

    const post = await Post.findById(postId)
      .populate("Owner", "-password")
      .lean();

    if (!post) {
      throw new Error("post not found");
    }

    if (post.Owner._id.toString() != userId.id) {
      throw new Error("you don't have tha authority to update this post");
    }
    if (cooldownPost.has(userId.id)) {
      throw new Error("your doing too much requests , wait 1 min");
    }
    cooldownPost.add(userId.id);
    setTimeout(() => {
      cooldownPost.delete(userId.id);
    }, 60000);

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { content: content },
      { new: true }
    )
      .populate("Owner", "-password")
      .lean();

    return res.status(200).json({ data: updatedPost });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const DeletePost = async (req, res) => {
  try {
    let postID = req.params.PostID;
    const { id } = req.body;

    const userId = jwt.decode(req.cookies.RefreshToken);

    if (postID === "undefined") postID = id;

    TestValidIP(postID);
    TestValidIP(userId.id);

    const post = await Post.findById(postID);

    if (!post) {
      throw new Error("post not found");
    }

    if (post.Owner._id.toString() != userId.id) {
      throw new Error("you don't have tha authority to update this post");
    }

    post.remove();
    if (post.commentsCount > 0) {
      await Comment.deleteMany({ post: postID });
    }
    if(post.likeCount>0){
      await PostLike.deleteMany({ post: postID });
    }

    return res.status(200).json({ data: post });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const LikePost = async (req, res) => {
  try {
    const { id } = req.body;
    let postID = req.params.PostID;
    const userId = jwt.decode(req.cookies.RefreshToken);
    if (postID === "undefined") postID = id;
    TestValidIP(postID);
    TestValidIP(userId.id);
    let post = await Post.findById(postID);
    if (!post) {
      throw new Error("post not found");
    }
    if (cooldownLike.has(userId.id)) {
      throw new Error("your doing too much requests, wait 10 secs");
    }
    cooldownLike.add(userId.id);
    setTimeout(() => {
      cooldownLike.delete(userId.id);
    }, 10000);
    const existLike = await PostLike.find({ post: postID, user: userId.id });
    let updatedPost;
    if (existLike.length > 0) {
      await PostLike.findOneAndDelete({ post: postID, user: userId.id });
      updatedPost = await Post.findByIdAndUpdate(
        postID,
        { $inc: { likeCount: -1 } },
        { new: true }
      )
        .populate("Owner", "-password")
        .lean();
    } else {
      await PostLike.create({ post: postID, user: userId.id });
      updatedPost = await Post.findByIdAndUpdate(
        postID,
        { $inc: { likeCount: 1 } },
        { new: true }
      )
        .populate("Owner", "-password")
        .lean();
    }
    return res.status(200).json({ data: updatedPost });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const GetUserPosts = async (req, res) => {
  try {
    const userID = req.params.userID;

    TestValidIP(userID);
    const posts = await Post.find({ Owner: userID }).populate(
      "Owner",
      "-password"
    );
    return res.status(200).json({ data: posts });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const GetUserLikedPosts = async (req, res) => {
  try {
    const userID = req.params.userID;

    TestValidIP(userID);
    const posts = await PostLike.find({ Owner: userID }).populate({
      path: "post",
      populate: { path: "Owner", select: "-password" },
    });

    return res.status(200).json({ data: posts });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const GetPost = async (req, res) => {
  try {
    const PostID = req.params.PostID;
    if (!PostID) {
      throw new Error("missing fields ");
    }
    TestValidIP(PostID);
    const post = await Post.findById(PostID)
      .populate("Owner", "-password")
      .lean();
    return res.status(200).json({ data: post });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const GetTopPosts = async (req, res) => {
  try {
    let posts = await Post.find()
      .sort({ likeCount: "desc" })
      .limit(3)
      .populate("Owner", "-password")
      .lean();

    return res.status(200).json({ data: posts });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const TestValidIP = (IP) => {
  if (!mongoose.Types.ObjectId.isValid(IP)) {
    throw new Error("not a valid ID");
  }
};

module.exports = {
  GetPosts,
  CreatePost,
  UpdatePost,
  DeletePost,
  LikePost,
  GetUserPosts,
  GetPost,
  GetTopPosts,
  GetUserLikedPosts,
};
