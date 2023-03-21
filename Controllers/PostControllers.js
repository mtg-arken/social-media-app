const mongoose = require("mongoose");
const Post = require("../Models/PostModel");
const Comment = require("../Models/CommentModel");
const PostLike = require("../Models/PostLikeModel");

const cooldown = new Set();

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
    const { title, content, userID } = req.body;
    if (!title && !content && !userID) {
      throw new Error("missing fields");
    }
    TestValidIP(userID);
    if (cooldown.has(userID)) {
      throw new Error("your doing too much requests");
    }
    cooldown.add(userID);
    setTimeout(() => {
      cooldown.delete(userID);
    }, 60000);
    const newPost = await Post.create({
      Owner: userID,
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
    const postID = req.params.PostID;
    const { content, isAdmin, userID } = req.body;
    if (!content) {
      throw new Error("missing fields");
    }
    TestValidIP(postID);
    TestValidIP(userID);
    const post = await Post.findById(postID);
    if (!post) {
      throw new Error("post not found");
    }
    if (post.Owner != userID && !isAdmin) {
      throw new Error("you dont have tha authority to update this post");
    }
    post.content = content;
    post.edited = true;
    post.save;
    return res.status(200).json({ data: post });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const DeletePost = async (req, res) => {
  try {
    const postID = req.params.PostID;
    const { isAdmin, userID } = req.body;
    TestValidIP(postID);
    TestValidIP(userID);
    const post = await Post.findById(postID);
    if (!post) {
      throw new Error("post not found");
    }
    if (post.Owner != userID && !isAdmin) {
      throw new Error("you dont have tha authority to update this post");
    }
    post.remove();
    if (post.commentsCount > 0) {
      await Comment.deleteMany({ post: postID });
    }
    return res.status(200).json({ data: post });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const LikePost = async (req, res) => {
  try {
    const postID = req.params.PostID;
    const { userID } = req.body;
    TestValidIP(postID);
    TestValidIP(userID);
    const post = await Post.findById(postID);
    if (!post) {
      throw new Error("post not found");
    }
    const existLike = await PostLike.find({ post: postID, user: userID });
    if (existLike.length > 0) {
      throw new Error("already liked this post ");
    }
    PostLike.create({ post: postID, user: userID });
    post.likeCount++;
    post.save();
    return res.status(200).json({ data: post });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const UnlikePost = async (req, res) => {
  try {
    const postID = req.params.PostID;
    const { userID } = req.body;
    TestValidIP(postID);
    TestValidIP(userID);
    const post = await Post.findById(postID);
    if (!post) {
      throw new Error("post not found");
    }
    await PostLike.findOneAndDelete({ postID, userID });
    post.likeCount--;
    post.save();
    return res.status(200).json({ data: post });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const GetUsersLikedPost = async (req, res) => {
  try {
    const userID = req.params.userID;

    TestValidIP(userID);
    const likes = await PostLike.find({ user: userID })
      .populate({ path: "post", populate: { path: "Owner" } })
      .lean();
    return res.status(200).json({ data: likes });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const GetPost = async (req, res) => {
  try {
    const { userID } = req.body;

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
  UnlikePost,
  GetUsersLikedPost,
  GetPost,
  GetTopPosts,
};
