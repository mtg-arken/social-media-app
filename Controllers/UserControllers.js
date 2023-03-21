const User = require("../Models/UserModel");
const follow = require("../Models/FollowModel");
const Post = require("../Models/PostModel");

const bcrypt = require("bcrypt");

const Follow = async (req, res) => {
  try {
    const { UserID } = req.body;
    const FollowingID = req.params.ID;
    const ExistedFollowing = await follow.find({
      userId: UserID,
      followingId: FollowingID,
    });
    console.log(UserID, FollowingID, ExistedFollowing.length);

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
    console.log(UserID, FollowingID, ExistedFollowing.length);

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
    const UserName = req.params.UserName;
    const user = await User.find({ username: UserName }).select("-password");

    if (!user) {
      throw new Error("user doesnt exist ");
    }

    const userPosts = await Post.find({ owner: user.id }).sort("-createdAt");

    let likeCount = 0;
    userPosts.map((post) => {
      likeCount = post.likeCount;
    });

    return res.status(200).json({
      data: {
        user,
        post: {
          likeCount: likeCount,
          postCount: userPosts.length,
          data: userPosts,
        },
      },
    });
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
};
