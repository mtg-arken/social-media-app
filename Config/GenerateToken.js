const jwt = require("jsonwebtoken");

const createToken = async (id) => {
  return jwt.sign({ id:id }, process.env.PRIVATE_KEY, {
    expiresIn: "1h",
  });
};
const createRefreshToken = async (id) => {
  return jwt.sign({ id:id }, process.env.PRIVATE_KEY, {
    expiresIn: "1d",
  });
};




module.exports = { createToken, createRefreshToken };
