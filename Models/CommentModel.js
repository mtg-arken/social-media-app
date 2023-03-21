const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    commenter: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    postID: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
    ParentID: {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
    Content: {
      type: String,
      required : true,
    },
    edited: {
      type: Boolean,
      default: false,
    },
    children: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);
module.exports = Comment = mongoose.model("Comment", CommentSchema);
