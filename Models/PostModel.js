const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    Owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxLength: [80, "should be less than 80 caract"],
    },
    content: {
      type: String,
      required: true,
      maxLength: [8000, "should be less than 8000 caract"],
    },
    likeCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    edited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = Post = mongoose.model("Post", PostSchema);
