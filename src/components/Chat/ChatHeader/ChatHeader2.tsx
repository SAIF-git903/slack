import React from "react";

function ChatHeader2({ receiverName, receiverData }: any) {
  return (
    <>
      <div className="chatHeader-user-profile-pic-container">
        <img
          src={receiverData.profilePic}
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
        <p>
          This conversation is just between{" "}
          <span className="profile-tag-span-chatHeader">@{receiverName}</span>{" "}
          and you Check out their profile to learn more about them. View Profile
        </p>
      </div>
    </>
  );
}

export default ChatHeader2;
