const User = require("../Models/UserModel");

const mongoose = require("mongoose");

const FindUserById = (id) => {
  return User.findById(id).select("-password");
};
const FindUserByNameOrEmail = (UserName, Email) => {
  return User.findOne({
    $or: [{ username: UserName }, { email: Email }],
  });
};
const FindUserByEmail = (Email) => {
  return User.findOne({ email: Email });
};
const FindFollowers = (UserID) => {
  return follow.find(UserID);
};
const GetRandomUsersService = () => {
  return User.aggregate([
    { $sample: { size: 5 } }, // You want to get 5 docs
  ]);
};
const FindOneFollowing = (UserID, FollowingID) => {
  return follow.find({
    userId: UserID,
    followingId: FollowingID,
  });
};
const DeleteOneFollowing = (UserID, FollowingID) => {
  return follow.deleteOne({
    userId: UserID,
    followingId: FollowingID,
  });
};
const FindFollowing = (UserID) => {
  return follow.find({ userId: UserID });
};
const CreateFollow = (UserID, FollowingID) => {
  return follow.create({
    userId: UserID,
    followingId: FollowingID,
  });
};
const CreateNewUser = (UserName, Email, Password) => {
  return User.create({
    username: UserName,
    email: Email,
    password: Password,
  });
};
module.exports = {
  FindFollowers,
  FindUserById,
  FindUserByEmail,
  FindUserByNameOrEmail,
  GetRandomUsersService,
  FindFollowing,
  FindOneFollowing,
  DeleteOneFollowing,
  CreateFollow,
  CreateNewUser,
};
