const jwt = require("jsonwebtoken");
const {
  FindPosts,
  FindPostById,
  FindUserLikedPosts,
  FindUserLikedPost,
  UpdatePostLike,
  DeletePostLikes,
  CreatePostLike,
  FindTopPosts,
} = require("../Services/PostServices");
const { DeletePostComments } = require("../Services/CommentServices");

const CountdownPost = new Set();
const CountdownLike = new Set();

//get posts of specific user
const GetPosts = async (req, res) => {
  try {
    const { page, sortBy, author, search, liked } = req.query;

    let posts = await FindPosts(sortBy);

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
    if (cooldownPost.has(userId.id)) {
      throw new Error("your doing too much requests , wait 1 min");
    }
    cooldownPost.add(userId.id);
    setTimeout(() => {
      cooldownPost.delete(userId.id);
    }, 60000);

    const newPost = await CreatePost(userId.id, title, content);

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

    const post = await FindPostById(postId);

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

    const updatedPost = await UpdatePostContent(postId, content);

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

    const post = await FindPostById(postID);

    if (!post) {
      throw new Error("post not found");
    }

    if (post.Owner._id.toString() != userId.id) {
      throw new Error("you don't have tha authority to update this post");
    }

    if (post.commentsCount > 0) {
      await DeletePostComments(postID);
    }
    if (post.likeCount > 0) {
      await DeletePostLikes(postID);
    }
    post.remove();
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
    let post = await FindPostById(postID);
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

    const existLike = await FindUserLikedPost(postID, userId.id);

    let updatedPost;
    if (existLike.length > 0) {
      await DeleteUserLike(postID, userId.id);
      updatedPost = await UpdatePostLike(postID, -1);
    } else {
      await CreatePostLike(postID, userId.id);
      updatedPost = await UpdatePostLike(postID, 1);
    }
    return res.status(200).json({ data: updatedPost });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const GetUserPosts = async (req, res) => {
  try {
    const userID = req.params.userID;
    const posts = await FindPostByOwnerId(userID);
    return res.status(200).json({ data: posts });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const GetUserLikedPosts = async (req, res) => {
  try {
    const userID = req.params.userID;

    const posts = await FindUserLikedPosts(userID);

    return res.status(200).json({ data: posts });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const GetPost = async (req, res) => {
  try {
    const PostID = req.params.PostID;

    const post = await FindPostById(PostID);
    return res.status(200).json({ data: post });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const GetTopPosts = async (req, res) => {
  try {
    let posts = await FindTopPosts();
    return res.status(200).json({ data: posts });
  } catch (error) {
    return res.status(400).json({ error: error.message });
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
