import * as React from "react";
import { ReactNode } from "react";
import ChatMessage from "../ChatMessage";
import { DocumentData, doc, onSnapshot, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebaseConfig";
import { Divider } from "antd";

interface ChatData {
  displayName: string;
  text: string;
  time: string;
}

type ChatBodyProps = {
  children: ReactNode;
};

const Chat = (props: ChatBodyProps) => {
  return <div>{props.children}</div>;
};

const ChatBody = ({
  receiverName,
  chatId,
  UserId,
  profilePic,
  listTitle,
}: any) => {
  const [chatMessages, setChatMessages] = React.useState<ChatData[]>([]);
  // const [msgTime, setMsgTime] = React.useState<string>("")

  const chatRef = doc(db, "chats", chatId);
  onSnapshot(chatRef, (doc) => {
    const chatData = doc.data() as DocumentData;
    const messages: ChatData[] = chatData?.messages ?? [];
    // const msgTime: string = chatData?.time
    // setMsgTime(msgTime)
    setChatMessages(messages);
  });

  return (
    <Chat>
      {chatMessages.map((chat: ChatData, index: number) => {
        return (
          <>
            {/* <Divider>
              <p
                style={{
                  border: "1px solid grey",
                  padding: " 0 10px",
                  borderRadius: "15px",
                }}
              >
                Tuesday 01:05
              </p>
            </Divider> */}
            <ChatMessage
              key={index}
              senderName={chat.displayName}
              chatId={chatId}
              message={chat.text}
              timestamp={chat.time}
              UserId={UserId}
              profilePic={profilePic}
              listTitle={listTitle}
            />
          </>
        );
      })}
    </Chat>
  );
};

export default ChatBody;
