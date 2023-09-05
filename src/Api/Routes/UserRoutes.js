const express = require("express");
const router = express.Router();
const userControllers = require("../Controllers/UserControllers");

const { VerifyAuth } = require("../MiddleWares/VerifyAuth");
const {
  BodyValidation,
  ParamsValidation,
} = require("../MiddleWares/Validation");

const IdSchema = require("../Validations/IdValidation");
const UserBioSchema = require("../Validations/UserBioValidation");

router.post(
  "/Follow/:ID",
  ParamsValidation(IdSchema("ID")),
  BodyValidation(IdSchema("UserID")),
  VerifyAuth,
  userControllers.Follow
);

router.delete(
  "/UnFollow/:ID",
  ParamsValidation(IdSchema("ID")),
  VerifyAuth,
  userControllers.UnFollow
);
router.get(
  "/GetFollowers/:ID",
  ParamsValidation(IdSchema("ID")),
  userControllers.GetFollowers
);
router.get(
  "/GetFollowing/:ID",
  ParamsValidation(IdSchema("ID")),
  userControllers.GetFollowing
);
router.get("/GetUser", VerifyAuth, userControllers.GetUser);
router.get(
  "/GetProfile/:ID",
  ParamsValidation(IdSchema("ID")),
  userControllers.GetProfile
);
router.get("/GetRandomUser", userControllers.GetRandomUsers);
router.put(
  "/UpdateUser/:ID",
  VerifyAuth,
  ParamsValidation(IdSchema("ID")),
  BodyValidation(UserBioSchema),
  userControllers.UpdateUser
);

module.exports = router;
