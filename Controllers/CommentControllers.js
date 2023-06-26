const mongoose = require("mongoose");
const Comment = require("../Models/CommentModel");
const Post = require("../Models/PostModel");
const jwt = require("jsonwebtoken");

const cooldown = new Set();

const CreateComment = async (req, res) => {
  try {
    const postId = req.params.postID;
    const { content, parentId } = req.body;
    TestValidID(postId);
    const userId = jwt.decode(req.cookies.RefreshToken);

    TestValidID(userId.id);
    const post = await Post.findById(postId).populate("Owner", "-password");
    if (!post) {
      throw new Error("post not found");
    }
    if (cooldown.has(userId.id)) {
      throw new Error("too much requests !! Please try again shortly.");
    }
    cooldown.add(userId.id);
    setTimeout(() => {
      cooldown.delete(userId.id);
    }, 30000);

    const comment = await Comment.create({
      Content: content,
      ParentID: parentId,
      commenter: userId.id,
      postID: postId,
    });
    if (parentId) {
      TestValidID(parentId);
      const parentComment = await Comment.findById(parentId);
      parentComment.children.push(comment);
      parentComment.save();
    }
    post.commentsCount++;
    await post.save();
    await Comment.populate(comment, { path: "commenter", select: "-password" });
    return res.status(200).json({ data: post });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const GetPostComments = async (req, res) => {
  try {
    const postID = req.params.postID;

    TestValidID(postID);
    const comments = await Comment.find({
      postID: postID,
      ParentID: { $eq: null },
    })
      .populate({
        path: "commenter",
        select: "-password",
      })
      .populate({
        path: "children",
        populate: {
          path: "commenter",
          select: "-password",
        },
      })
      .lean();

    return res.status(200).json({ data: comments });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const UpdateComment = async (req, res) => {
  try {
    let commentID = req.params.commentID;
    const { content } = req.body;
    TestValidID(commentID);
    let comment = await Comment.findById(commentID);

    const userId = jwt.decode(req.cookies.RefreshToken);

    TestValidID(userId.id);
    if (comment.commenter._id != userId.id) {
      throw new Error("you are not allowed to modify it");
    }
    if (!content) {
      throw new Error("cant put empty content");
    }
    comment = await Comment.findByIdAndUpdate(
      commentID,
      { Content: content, edited: true },
      { new: true }
    )
      .populate({ path: "commenter", select: "-password" })
      .populate({ path: "children", populate: { path: "children" } })
      .lean();

    return res.status(200).json({ data: comment });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const GetUserComments = async (req, res) => {
  try {
    const userID = req.params.userID;
    const comments = await Comment.find({ commenter: userID })
      .populate({ path: "postID" })
      .sort("-cratedAt")
      .lean();
    return res.status(200).json({ data: comments });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const DeleteComment = async (req, res) => {
  try {
    const commentID = req.params.commentID;
    const { userID, isAdmin } = req.body;
    TestValidID(commentID);
    TestValidID(userID);
    const comment = await Comment.findById(commentID);
    if (comment.commenter != userID && !isAdmin) {
      throw new Errow("you are not allowed to do this action");
    }

    if (comment.ParentID) {
      const parentComment = await Comment.findById(comment.ParentID);
      const index = await parentComment.children.findIndex(
        (obj) => obj.id === comment.id
      );
      parentComment.children.splice(index, 1);
      await parentComment.save();
    }

    if (comment.children.length > 0) {
      comment.children.map(async (child) => {
        await Comment.findByIdAndDelete(child._id);
        await Post.findByIdAndUpdate(comment.postID, {
          $inc: { commentsCount: -1 },
        });
      });
    }

    await Post.findByIdAndUpdate(comment.postID, {
      $inc: { commentsCount: -1 },
    });

    await comment.remove();

    return res.status(200).json({ data: comment });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const TestValidID = (ID) => {
  if (!mongoose.Types.ObjectId.isValid(ID)) {
    throw new Error("not a valid ID");
  }
};
module.exports = {
  CreateComment,
  GetPostComments,
  UpdateComment,
  GetUserComments,
  DeleteComment,
};
