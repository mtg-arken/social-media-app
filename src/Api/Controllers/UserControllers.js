const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {
  FindUserById,
  FindFollowers,
  FindRandomUsers,
  FindFollowing,
  FindOneFollowing,
  CreateFollow,
  GetRandomUsersService,
} = require("../Services/UserServices");
const { FindPostByOwnerIdService } = require("../Services/PostServices");

const Follow = async (req, res) => {
  try {
    const { UserID } = req.body;
    const FollowingID = req.params.ID;

    const ExistedFollowing = await FindOneFollowing(UserID, FollowingID);

    if (ExistedFollowing) {
      throw new Error("already following this guy");
    }
    const following = await CreateFollow(UserID,FollowingID)
    return res.status(200).json({ data: following });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const UnFollow = async (req, res) => {
  try {
    const { UserID } = req.body;
    const FollowingID = req.params.ID;

    const ExistedFollowing = await GetOneFollowingService(UserID, FollowingID);
    if (!ExistedFollowing) {
      throw new Error("you are not following him");
    }
    const following = await DeleteOneFollowingService(UserID, FollowingID);
    return res.status(200).json({ data: following });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
// user followers
const GetFollowers = async (req, res) => {
  try {
    const UserID = req.params.ID;
    const followers = await FindFollowersService(UserID);
    return res.status(200).json({ data: followers });
  } catch (err) {
    return res.status(400).res.json({ error: err.message });
  }
};
//user following to
const GetFollowing = async (req, res) => {
  try {
    const UserID = req.params.ID;
    const following = await GetFollowingService(UserID);
    return res.status(200).json({ data: following });
  } catch (err) {
    return res.status(400).res.json({ error: err.message });
  }
};
const GetUser = async (req, res) => {
  try {
    const userId = jwt.decode(req.cookies.RefreshToken);
    const user = await FindUserByIdService(userId);
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

    let user = await FindUserByIdService(userId);
    if (!user) {
      throw new Error("user doesnt exist ");
    }

    const userPosts = await FindPostByOwnerIdService(
      mongoose.Types.ObjectId(user._id)
    );

    let likeCount = 0;
    userPosts.map((post) => {
      likeCount += post.likeCount;
    });

    return res
      .status(200)
      .json({ user: user, likeCount: likeCount, postsCount: userPosts.length });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const GetRandomUsers = async (req, res) => {
  try {
    const users = await GetRandomUsersService();
    return res.status(200).json({ data: users });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const UpdateUser = async (req, res) => {
  try {
    const { bio } = req.body;
    const userId = req.params.ID;

    const user = await FindUserByIdService(userId);
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
  UnFollow,
  GetFollowers,
  GetFollowing,
  GetUser,
  GetRandomUsers,
  UpdateUser,
  GetProfile,
};
