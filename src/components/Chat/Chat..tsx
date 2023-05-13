import { Divider } from "antd";
import React, { useEffect } from "react";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import ChatHeader2 from "./ChatHeader/ChatHeader2";
import ChatInput from "./ChatInput";
import "./ChatStyle.css";
import { useLocation } from "react-router-dom";

function Chat() {
  const location = useLocation()
  useEffect(() => {
    console.log(location.state)
  },[location.state])
  
  return (
    <React.Fragment>
      <ChatHeader receiverName={location.state.listTitle}/>
      <div className="overflow-chat-scroll">
        <ChatHeader2 />
        <Divider />
        <ChatBody />
      </div>
      <ChatInput />
    </React.Fragment>
  );
}

export default Chat;
