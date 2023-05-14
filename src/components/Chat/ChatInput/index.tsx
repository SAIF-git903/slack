import React from "react"
import { PoweroffOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import "./style.css";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import moment from "moment"

interface ChatInputProps {
  chatId: string;
}

function ChatInput(props: ChatInputProps) {
  
  const [inputMsg, setInputMsg] = React.useState<string>()
  
  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMsg(e.target.value)
  }
  
  const handleSendMessage = () => {
    console.log(props.chatId)
    const message = {
      text: inputMsg,
      displayName: "Saif",
      senderUid: "user1",
      time: moment().format('LT'), 
      isRead: false
    };
    
    const chatRef = doc(db, 'chats', props.chatId);

    updateDoc(chatRef, {
      messages: arrayUnion(message),
    });
  }
  
  return (
    <div className="centered">
      <div className="chat-input-container centered">
        <Input placeholder="Message Ali Hamza" className="chat-input-input" onChange={handleOnChangeInput}/>
        <Button
          type="primary"
          style={{ background: "#007a5a", marginRight: "10px" }}
          icon={<SendOutlined />}
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
}

export default ChatInput;
