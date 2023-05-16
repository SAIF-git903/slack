import { Divider } from "antd";
import React, { useEffect } from "react";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import ChatHeader2 from "./ChatHeader/ChatHeader2";
import ChatInput from "./ChatInput";
import "./ChatStyle.css";
import { useLocation } from "react-router-dom";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Chat() {
  const location = useLocation();
  let { UserId, listTitle } = location.state;

  const [chatRoomId, setChatRoomId] = React.useState<string>();

  useEffect(() => {
    console.log(auth.currentUser);
  }, [location.state]);

  const currentUserUuid = auth.currentUser?.uid;
  const otherUserUuid = UserId;
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

  return (
    <React.Fragment>
      <ChatHeader receiverName={location?.state?.listTitle} />
      <div className="overflow-chat-scroll">
        <ChatHeader2 receiverName={location?.state?.listTitle} />
        <Divider />
        <ChatBody receiverName={location?.state?.listTitle} chatId={chatId} />
      </div>
      <ChatInput chatId={chatId} receiverName={location?.state?.listTitle} />
    </React.Fragment>
  );
}

export default Chat;
