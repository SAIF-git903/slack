import { Avatar } from "antd";
import React from "react";
import "./style.css";

function ChatMessage() {
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
          <p style={{ marginTop: "0px", fontWeight: "bold" }}>Ali Hamza</p>
          <p style={{ marginTop: "-15px" }}>
            hi thererhi thererhi
            This is testing phase.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
