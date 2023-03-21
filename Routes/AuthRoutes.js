const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/AuthControllers");

router.post("/Register", authControllers.Register);
router.post("/Login", authControllers.Login);
router.post("/Logout", authControllers.Logout);



module.exports = router;