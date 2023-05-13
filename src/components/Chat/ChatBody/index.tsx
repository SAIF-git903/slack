import * as React from "react"
import { ReactNode } from "react";
import ChatMessage from "../ChatMessage";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

interface ChatData {
  displayName: string;
  text: string;
  timestamp: string;
}

type ChatBodyProps = {
  children: ReactNode;
};

const Chat = (props: ChatBodyProps) => {
  return <div>{props.children}</div>;
};

const ChatBody = ({receiverName, chatId} : any) => {
  const [chatMessages, setChatMessages] = React.useState<ChatData[]>([]);

  const chatRef = doc(db, "chats", chatId);
  onSnapshot(chatRef, (doc) => {
    const chatData = doc.data() as DocumentData;
    const messages: ChatData[] = chatData?.messages ?? [];
    setChatMessages(messages);
  });
  
  return (
    <Chat>
      {
       chatMessages.map((chat: ChatData, index: number) => {
          return (
            <ChatMessage key={index} senderName={chat.displayName} chatId={chatId} message={chat.text} timestamp={chat.timestamp}/>
          )
        })
      }
    </Chat>
  );
};

export default ChatBody;
