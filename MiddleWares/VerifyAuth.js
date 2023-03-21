const VerifyAuth = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.PRIVATE_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log("auth is working !!");
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = { VerifyAuth };
