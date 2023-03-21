const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

router.post("/Follow/:ID", userControllers.Follow);
router.delete("/UnFollow/:ID", userControllers.Unfollow);
router.get("/GetFollowers/:ID", userControllers.GetFollowers);
router.get("/GetFollowing/:ID", userControllers.GetFollowing);
router.get("/GetUser/:UserName", userControllers.GetUser);
router.get("/GetRandomUser", userControllers.GetRandomUsers);
router.put("/UpdateUser/:ID", userControllers.UpdateUser);

module.exports = router;
