const mongoose = require("mongoose");
const Message = require("../Models/MessageModel");
const Conversation = require("../Models/ConversationModel");
const User = require("../Models/UserModel");

const SendMessage = async (req, res) => {
  try {
    const recpID = req.params.recpID;
    const { userID, content } = req.body;

    TestValidID(recpID);
    TestValidID(userID);
    if (!content) {
      throw new Error("cant sen empty message ");
    }
    const recp = await User.findById(recpID);
    if (!recp) {
      throw new Error("user not found");
    }
    let conversation = await Conversation.findOne({
      recipients: { $all: [recpID, userID] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        recipients: [recpID, userID],
      });
      conversation.recipients.push(userID);
      conversation.recipients.push(recpID);
    }
    const message = await Message.create({
      conversation: conversation,
      sender: userID,
      content: content,
    });
    conversation.lastMessageAt = message.createdAt;

    await conversation.save();

    return res.status(200).json({ data: message });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const GetMessages = async (conversationID) => {
  try {
    TestValidID(conversationID);
    const conversation = await Conversation.findById(conversationID);
    if (!conversation) {
      return { error: "no conversation found" }
    }
    const messages = await Message.find({
      conversation: conversationID,
    })
      .populate("sender", "-password")
      .sort("-createdAt")
      .limit(12);
    return messages
  } catch (error) {
    return { error: error.message }
  }
};
const GetConversations = async (userID) => {
  try {
    const conversations = await Conversation.find({ $in: [userID] })
      .populate({ path: "recipients", select: "-password" })
      .sort("lastMessageAt")
      .limit(12)
      .lean();
    return ({ data: conversations });
  } catch (error) {
    return ({ error: error.message });
  }
};
const TestValidID = (ID) => {
  if (!mongoose.Types.ObjectId.isValid(ID)) {
    throw new Error("not a valid ID");
  }
};

module.exports = {
  GetConversations,
  GetMessages,
  SendMessage,
};
