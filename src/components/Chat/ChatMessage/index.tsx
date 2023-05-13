import { Avatar } from "antd";
import React from "react";
import "./style.css";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

function ChatMessage({ senderName, message }: any) {

  
  
  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginLeft: "25px" }}>
        <div>
          <Avatar
            src="https://ca.slack-edge.com/T03A7U0BX41-U04AM2QLZCZ-1bcd531b1e51-512"
            shape="square"
          />
        </div>
        <div className="special-div">
          <p style={{ marginTop: "0px", fontWeight: "bold" }}>{senderName}</p>
          <p style={{ marginTop: "-15px" }}>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
