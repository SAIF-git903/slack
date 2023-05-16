import { Avatar, Divider } from "antd";
import React from "react";
import "./style.css";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebaseConfig";
import moment from "moment";

function ChatMessage({ senderName, message, timestamp }: any) {
  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginLeft: "25px" }}>
        <div>
          <Avatar src={auth.currentUser?.photoURL} shape="square" />
        </div>
        <div className="special-div">
          <div style={{ display: "flex", gap: "10px" }}>
            <p style={{ marginTop: "0px", fontWeight: "bold" }}>{senderName}</p>
            <div
              style={{ marginTop: "-15px", fontSize: "12px" }}
              className="centered"
            >
              <p>{timestamp}</p>
            </div>
          </div>
          <p style={{ marginTop: "-15px" }}>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
