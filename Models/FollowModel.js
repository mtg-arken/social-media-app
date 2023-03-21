const mongoose = require("mongoose");
const { Schema } = mongoose;

const FollowSchema = new Schema( {
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  followingId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
},
{ timestamps: true });
module.exports = Follow = mongoose.model('Follow', FollowSchema);
