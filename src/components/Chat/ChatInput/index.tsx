import React from "react";
import { PoweroffOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import "./style.css";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../firebase/firebaseConfig";
import moment from "moment";
import { toast, Toaster } from "react-hot-toast";

interface ChatInputProps {
  chatId: string;
  receiverName: string;
}

function ChatInput(props: ChatInputProps) {
  const [inputMsg, setInputMsg] = React.useState<string>();

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMsg(e.target.value);
  };

  async function getData() {
    console.log("get data working as expected");
    const q = query(
      collection(db, "users"),
      where("displayName", ">=", auth?.currentUser?.displayName),
      where("displayName", "<=", auth?.currentUser?.displayName + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((res) => {
      console.log(res.data().photoURL);
    });
  }

  const handleSendMessage = () => {
    getData();

    let emailSplit: any = auth.currentUser?.email;

    const message = {
      text: inputMsg,
      displayName: auth?.currentUser?.displayName || emailSplit.split("@")[0],
      senderUid: auth.currentUser?.uid,
      time: moment().format("LT"),
      isRead: false,
    };

    setInputMsg("");
    const chatRef = doc(db, "chats", props.chatId);
    updateDoc(chatRef, {
      messages: arrayUnion(message),
    })
      .then(() => "")
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="centered">
      <div className="chat-input-container centered">
        <Input
          placeholder={`Message ${props.receiverName}`}
          className="chat-input-input"
          onChange={handleOnChangeInput}
          value={inputMsg}
        />
        <Button
          type="primary"
          disabled={inputMsg?.length ? false : true}
          style={{ background: "#007a5a", marginRight: "10px" }}
          icon={<SendOutlined />}
          onClick={handleSendMessage}
        />
      </div>
      <Toaster />
    </div>
  );
}

export default ChatInput;
