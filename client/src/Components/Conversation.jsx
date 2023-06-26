import React, { useEffect, useState } from "react";

function Conversation(props) {
  const { socket } = props;
  const [messages, setMessages] = useState([])
  useEffect(() => {
    socket?.emit("getMessages", props.id);
    socket?.on("getMessages", (data) => {setMessages(data)});
  }, [props.id, socket]);
  return <div>Conversation</div>;
}

export default Conversation;
