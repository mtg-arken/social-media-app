const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConversationSchema = new Schema(
  {
    recipients: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],

    lastMessageAt: {
      type: Date,
    },
  },
  { timestamps: true }
);
module.exports = Conversation = mongoose.model(
  "Conversation",
  ConversationSchema
);
