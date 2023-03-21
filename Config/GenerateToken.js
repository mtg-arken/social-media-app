const jwt = require("jsonwebtoken");

const createToken = async (id) => {
  return jwt.sign({ id }, process.env.PRIVATE_KEY, {
    expiresIn: 1200 ,
  });
};

module.exports = { createToken };
