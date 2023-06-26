import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";
import ConversationsItem from "./ConversationsItem";
function Conversations(props) {
  const [conversations, setConversations] = useState([]);
  const { user } = useContext(UserContext);
  const { socket } = props;
  const location = useLocation();


  useEffect(() => {
    socket?.emit("getConversations", user._id);
    socket?.on("getConversations", (data) => {
      setConversations(data.data);
    });
    if (location.state) {
      props.setConversationId(location.state._id);
    }
  }, [location.state, props, socket, user._id]);
  return (
    <>
      {location.state && (
        <ConversationsItem name={location.state.name} image={location.state.image} />
      )}
      {conversations.map((chat, i) => (
        <div key={i}
          onClick={() => {
            props.setConversationId(chat._id);
          }}
        >
          chat.recipients[0]._id === user._id ? (
          <ConversationsItem
            name={chat.recipients[1].name}
            image={chat.recipients[1].image}
          />
          ) : (
          <ConversationsItem
            name={chat.recipients[0].name}
            image={chat.recipients[0].image}
          />{" "}
          )
        </div>
      ))}
    </>
  );
}

export default Conversations;
