import { Divider } from "antd";
import React from "react";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import ChatHeader2 from "./ChatHeader/ChatHeader2";
import ChatInput from "./ChatInput";
import "./ChatStyle.css";

function Chat() {
  return (
    <React.Fragment>
      <ChatHeader />
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
