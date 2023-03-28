const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const { VerifyAuth } = require("../MiddleWares/VerifyAuth");

router.post("/Follow/:ID",VerifyAuth , userControllers.Follow);
router.delete("/UnFollow/:ID",VerifyAuth , userControllers.Unfollow);
router.get("/GetFollowers/:ID", userControllers.GetFollowers);
router.get("/GetFollowing/:ID", userControllers.GetFollowing);
router.get("/GetUser",VerifyAuth, userControllers.GetUser);
router.get("/GetRandomUser", userControllers.GetRandomUsers);
router.put("/UpdateUser/:ID",VerifyAuth , userControllers.UpdateUser);

module.exports = router;
