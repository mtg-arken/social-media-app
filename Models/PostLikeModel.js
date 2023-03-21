const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostLikeSchema = new Schema({
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
} ,{ timestamps: true });
module.exports = PostLike = mongoose.model("PostLike", PostLikeSchema);
