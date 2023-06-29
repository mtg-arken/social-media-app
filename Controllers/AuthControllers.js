const { models } = require("mongoose");
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const { createToken, createRefreshToken } = require("../Config/GenerateToken");

const Register = async (req, res) => {
  try {
    const { UserName, Email, Password } = req.body;
    if (!(UserName && Email && Password)) {
      throw new Error("All inputs required");
    }
   

    const ExistedUser = await User.findOne({
      $or: [{ username: UserName }, { email: Email }],
    });
    if (ExistedUser) {
      throw new Error("username and email should be unique");
    }
    const user = await User.create({
      username: UserName,
      email: Email,
      password: Password,
    });
    console.log(UserName, Email, Password)

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!(Email && Password)) {
      throw new Error("fill all the fields pls ");
    }

    const user = await User.findOne({ email: Email });

    if (!user) {
      throw new Error("email is invalid ");
    }
    const ExistedPassword = await bcrypt.compare(Password, user.password);
    if (!ExistedPassword) {
      throw new Error("incorrect password");
    }
    const token = await createToken(user._id);
    const refreshToken = await createRefreshToken(user._id);

    res.cookie("token", token ,{
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge:    60 * 60 * 1000,
    });
    res.cookie("RefreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      user: {
        biography: user.biography,
        createdAt: user.createdAt,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        updatedAt: user.updatedAt,
        username: user.name,
        _id: user.id,
      },
    });
    return;
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.clearCookie("RefreshToken");

    res.status(200).send(" cookie deleted");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const maxAge = 3 * 24 * 60 * 60;

module.exports = {
  Login,
  Register,
  Logout,
};
