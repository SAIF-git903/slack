import { Divider } from "antd";
import React, { useEffect } from "react";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import ChatHeader2 from "./ChatHeader/ChatHeader2";
import ChatInput from "./ChatInput";
import "./ChatStyle.css";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Chat() {
  const location = useLocation();
  const [chatRoomId, setChatRoomId] = React.useState<string>();
  useEffect(() => {
    console.log(location.state);
  }, [location.state]);

  const currentUserUuid = "user1";
  const otherUserUuid = "user2";
  const chatId = [currentUserUuid, otherUserUuid].sort().join(":"); // e.g. "user1:user2"
  setTimeout(() => {
    setChatRoomId(chatId);
  }, 1000);
  // Create a new chat document if it doesn't exist already
  const chatRef = doc(db, "chats", chatId);
  getDoc(chatRef).then((doc) => {
    if (!doc.exists()) {
      // Create the chat document with an empty messages array
      setDoc(chatRef, {
        users: [currentUserUuid, otherUserUuid],
        messages: [],
      });
    }
  });

  console.log(chatId, "Chat Id");

  return (
    <React.Fragment>
      <ChatHeader receiverName={location?.state?.listTitle} />
      <div className="overflow-chat-scroll">
        <ChatHeader2 receiverName={location?.state?.listTitle} />
        <Divider />
        <ChatBody receiverName={location?.state?.listTitle} chatId={chatId} />
      </div>
      <ChatInput chatId={chatId} />
    </React.Fragment>
  );
}

export default Chat;
