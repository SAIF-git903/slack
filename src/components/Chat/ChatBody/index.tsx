import { ReactNode } from "react";
import ChatMessage from "../ChatMessage";

type ChatBodyProps = {
  children: ReactNode;
};

const Chat = (props: ChatBodyProps) => {
  return <div>{props.children}</div>;
};

const ChatBody = () => {
  return (
    <Chat>
      <ChatMessage />
    </Chat>
  );
};

export default ChatBody;
