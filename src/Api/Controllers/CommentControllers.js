const jwt = require("jsonwebtoken");
const {
  FindCommentById,
  UpdateCommentContent,
  DeleteCommentById,
  CreateNewComment,
  PopulateComment,
} = require("../Services/CommentServices");
const {
  FindPostById,
  DecreasePostCommentsCount,
} = require("../Services/PostServices");

const countdown = new Set();

const CreateComment = async (req, res) => {
  try {
    const postId = req.params.postID;
    const { content, parentId } = req.body;
    const userId = jwt.decode(req.cookies.RefreshToken);

    const post = await FindPostById(postId);
    if (!post) {
      throw new Error("post not found");
    }
    if (countdown.has(userId.id)) {
      throw new Error("too much requests !! Please try again shortly.");
    }
    countdown.add(userId.id);
    setTimeout(() => {
      countdown.delete(userId.id);
    }, 30000);

    const comment = await CreateNewComment(
      content,
      parentId,
      userId.id,
      postId
    );
    if (parentId) {
      const parentComment = await FindCommentById(parentId);
      parentComment.children.push(comment);
      parentComment.save();
    }
    post.commentsCount++;
    await post.save();
    await PopulateComment(comment);

    return res.status(200).json({ data: post });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const GetPostComments = async (req, res) => {
  try {
    const postID = req.params.postID;
    const comments = await FindPostComments(postID);
    return res.status(200).json({ data: comments });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const UpdateComment = async (req, res) => {
  try {
    let commentID = req.params.commentID;
    const { content } = req.body;
    let comment = await FindCommentById(commentID);

    const userId = jwt.decode(req.cookies.RefreshToken);

    if (comment.commenter._id != userId.id) {
      throw new Error("you are not allowed to modify it");
    }
    if (!content) {
      throw new Error("cant put empty content");
    }
    comment = await UpdateCommentContent(commentID, content);

    return res.status(200).json({ data: comment });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const GetUserComments = async (req, res) => {
  try {
    const userID = req.params.userID;
    const comments = await FindUserComments(userID);
    return res.status(200).json({ data: comments });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const DeleteComment = async (req, res) => {
  try {
    const commentID = req.params.commentID;
    const { userID, isAdmin } = req.body;
    const comment = await FindCommentById(commentID);
    if (comment.commenter != userID && !isAdmin) {
      throw new Error("you are not allowed to do this action");
    }

    if (comment.ParentID) {
      const parentComment = await FindCommentById(comment.ParentID);

      const index = await parentComment.children.findIndex(
        (obj) => obj.id === comment.id
      );
      parentComment.children.splice(index, 1);
      await parentComment.save();
    }

    if (comment.children.length > 0) {
      comment.children.map(async (child) => {
        await DeleteCommentById(child._id);
        await DecreasePostCommentsCount(comment.postID);
      });
    }
    await DecreasePostCommentsCount(comment.postID);
    await comment.remove();

    return res.status(200).json({ data: comment });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  CreateComment,
  GetPostComments,
  UpdateComment,
  GetUserComments,
  DeleteComment,
};
