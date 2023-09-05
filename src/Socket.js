
export const start =(io)=>{
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
  return io   
}

  