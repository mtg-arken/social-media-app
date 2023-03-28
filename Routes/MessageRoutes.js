const express = require("express");
const router = express.Router();
const MessageControllers = require("../controllers/MessageControllers");
const { VerifyAuth } = require("../MiddleWares/VerifyAuth");

router.post("/SendMessage/:recpID",VerifyAuth , MessageControllers.SendMessage);
router.get("/GetMessages/:postID",VerifyAuth , MessageControllers.GetMessages);
router.get("/GetConversations/:userID",VerifyAuth , MessageControllers.GetConversations);

module.exports = router;
