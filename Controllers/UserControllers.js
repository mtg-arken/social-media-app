const User = require("../Models/UserModel");
const follow = require("../Models/FollowModel");
const Post = require("../Models/PostModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Follow = async (req, res) => {
  try {
    const { UserID } = req.body;
    const FollowingID = req.params.ID;
    const ExistedFollowing = await follow.find({
      userId: UserID,
      followingId: FollowingID,
    });

    if (ExistedFollowing.length) {
      throw new Error("already following this guy");
    }
    const following = await follow.create({
      userId: UserID,
      followingId: FollowingID,
    });
    return res.status(200).json({ data: following });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const Unfollow = async (req, res) => {
  try {
    const { UserID } = req.body;
    const FollowingID = req.params.ID;
    const ExistedFollowing = await follow.find({
      userId: UserID,
      followingId: FollowingID,
    });

    if (!ExistedFollowing.length) {
      throw new Error("you are not following him");
    }
    const following = await follow.deleteOne({
      userId: UserID,
      followingId: FollowingID,
    });
    return res.status(200).json({ data: following });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
// user followers
const GetFollowers = async (req, res) => {
  try {
    const UserID = req.params.ID;
    const followers = await follow.find({ followingId: UserID });
    return res.status(200).json({ data: followers });
  } catch (err) {
    return res.status(400).res.json({ error: err.message });
  }
};
//user following to
const GetFollowing = async (req, res) => {
  try {
    const UserID = req.params.ID;
    const following = await follow.find({ userId: UserID });
    return res.status(200).json({ data: following });
  } catch (err) {
    return res.status(400).res.json({ error: err.message });
  }
};
const GetUser = async (req, res) => {
  try {
    const userId = jwt.decode(req.cookies.RefreshToken);
    const user = await User.findOne({ _id: userId.id }).select("-password");

    if (!user) {
      throw new Error("user doesnt exist ");
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const GetProfile = async (req, res) => {
  try {
    const userId = req.params.ID;

    let user = await User.findById(userId).select("-password");

    if (!user) {
      throw new Error("user doesnt exist ");
    }

    const userPosts = await Post.find({ Owner:  mongoose.Types.ObjectId(user._id)}).sort("-createdAt");

    let likeCount = 0;
    userPosts.map( (post) => {
       likeCount += post.likeCount;
    });



    return res.status(200).json({user:user,likeCount:likeCount,postsCount:userPosts.length});
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const GetRandomUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      { $sample: { size: 5 } }, // You want to get 5 docs
    ]);

    return res.status(200).json({ data: users });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const UpdateUser = async (req, res) => {
  try {
    const { bio } = req.body;
    if (!bio) {
      throw new Error("cant send empty bio ");
    }
    const userID = req.params.ID;
    const user = await User.findById(userID);
    if (!user) {
      throw new Error("user not found ");
    }
    user.biography = bio;
    await user.save();
    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  Follow,
  Unfollow,
  GetFollowers,
  GetFollowing,
  GetUser,
  GetRandomUsers,
  UpdateUser,
  GetProfile,
};
