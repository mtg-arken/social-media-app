import Conversation from "../Components/Conversation";
import Conversations from "../Components/Conversations";


import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";

import io from "socket.io-client";

export default function MessengerView(params) {
  const [socket, setSocket] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/");
    }
    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [navigate, user]);

  return (
    <div className="container  " style={{ marginTop: "30px" }}>
      <div className="row">
        <div className=" col-4  card p-0 ">
          <div className=" card-header d-flex justify-content-center ">
            <h3>contacts</h3>
          </div>
          <div className="card-body">
            <Conversations
              setConversationId={setConversationId}
              socket={socket}
            />
          </div>
        </div>
        <div className=" col  card p-0">
          <div className=" card-header d-flex justify-content-center ">
            <h3>contacts</h3>
          </div>
          <div className="card-body">
            {" "}
            <Conversation id={conversationId} socket={socket} />
          </div>
        </div>
      </div>
    </div>
  );
}
