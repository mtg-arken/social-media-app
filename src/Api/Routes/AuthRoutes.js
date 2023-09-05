const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/AuthControllers");
const {BodyValidation} =require('../MiddleWares/Validation')
const UserRegistrationValidation = require("../Validations/UserRegistrationValidation");

router.post("/Register",BodyValidation(UserRegistrationValidation), authControllers.Register);
router.post("/Login", authControllers.Login);
router.get("/Logout", authControllers.Logout);



module.exports = router;