const express = require("express");
const router = express.Router();
const MessageControllers = require("../controllers/MessageControllers");

router.post("/SendMessage/:recpID", MessageControllers.SendMessage);
router.get("/GetMessages/:postID", MessageControllers.GetMessages);
router.get("/GetConversations/:userID", MessageControllers.GetConversations);

module.exports = router;
