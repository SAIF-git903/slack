import React from "react";

function ChatHeader2({receiverName}: any) {
  return (
    <>
      <div className="chatHeader-user-profile-pic-container">
        <img
          src="https://ca.slack-edge.com/T03A7U0BX41-U04AM2QLZCZ-1bcd531b1e51-512"
          className="chatHeader-user-profile-pic"
          alt="user-profile-pic"
        />
        <div>
          <h4 className="centered" style={{ marginTop: "5px" }}>
            {receiverName}
          </h4>
          <p className="centered" style={{ marginTop: "-17px", color: "grey" }}>
            {receiverName}
          </p>
        </div>
      </div>
      <div style={{ marginLeft: "25px" }}>
        <div style={{ display: "flex" }}>
          <p>This conversation is just between</p>
          <p className="profile-tag-span-chatHeader centered">@{receiverName}</p>
          <p>
            and you. Check out their profile to learn more about them. View
            Profile
          </p>
        </div>
      </div>
    </>
  );
}

export default ChatHeader2;
