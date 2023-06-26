const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const MessageControllers = require("./Controllers/MessageControllers");
//const { VerifyAuth } = require("./MiddleWares/VerifyAuth");
require("./config/connectDB");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const users = require("./Routes/UserRoutes");
const auth = require("./Routes/AuthRoutes");
const posts = require("./Routes/PostRoutes");
const comments = require("./Routes/CommentRoutes");
const messages = require("./Routes/MessageRoutes");


app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/posts", posts);
app.use("/api/comments", comments);
app.use("/api/messages", messages);


io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("getConversations", async (id) => {
    let result = await MessageControllers.GetConversations(id);
    socket.emit("getConversations", result);
  });
  socket.on("getMessages", async (id) => {
    let result = await MessageControllers.GetMessages(id);
    socket.emit("getMessages", result);
  });
});

server.listen(8080, () => {
  console.log("app listening on port 8080");
});

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
