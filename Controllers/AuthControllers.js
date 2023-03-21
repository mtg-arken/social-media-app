const { models } = require("mongoose");
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const {createToken}= require("../Config/GenerateToken")

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
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
    return 
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const Logout = async (req, res) => {
  try {
    res.cookie("jwt",'',{maxAge:1})
    res.redirect('/')
  } catch (error) {}
};

const maxAge = 3 * 24 * 60 * 60


module.exports = {
  Login,
  Register,
  Logout,
};
