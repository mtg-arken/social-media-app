const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => {
    console.log("db error", error);
  });
