const jwt = require("jsonwebtoken");
const { createToken } = require("../../Config/GenerateToken");

const VerifyAuth = (req, res, next) => {
  const RefreshToken = req.cookies.RefreshToken;

  if (RefreshToken) {
    jwt.verify(
      RefreshToken,
      process.env.PRIVATE_KEY,
      async (err, decodedRefreshToken) => {
        if (err) {
          console.log(err.message, "refresh token");
        } else {
          const token = req.cookies.token;
          if (token) {
            jwt.verify(
              token,
              process.env.PRIVATE_KEY,
              async (err, decodedToken) => {
                if (err) {
                  console.log(err.message, "token");
                  next();
                } else {
                  next();
                }
              }
            );
          } else {
            const token = await createToken(decodedRefreshToken.id);
            res.cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
              maxAge: 60 * 60 * 1000,
            });
            next();
          }
        }
      }
    );
  }
};

module.exports = { VerifyAuth };
