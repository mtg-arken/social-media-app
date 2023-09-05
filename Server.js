const createApp=require('./src/App.js')
const app = createApp();
const {createServer}=require('http')

const server = createServer(app);

require("./src/config/connectDB.js") ;

/*
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
*/

server.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
