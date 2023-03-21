const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
require('./config/connectDB')

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true,}));
app.use(express.json());


const users = require("./Routes/UserRoutes");
const auth = require("./Routes/AuthRoutes");
const posts = require("./Routes/PostRoutes");
const comments = require("./Routes/CommentRoutes");
const messages = require("./Routes/MessageRoutes");


app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/posts",posts)
app.use("/api/comments",comments)
app.use("/api/messages",messages)

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
