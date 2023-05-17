import { Avatar } from "antd";
import { auth, db } from "../../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import store from "../../../Mst/Mst";
import "./style.css";
import React from "react";

function ChatMessage({
  senderName,
  message,
  timestamp,
  UserId,
  profilePic,
  listTitle,
}: any) {
  const getUserData = async (userId: string, senderName: string) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const { displayName, photoURL, email, uid, phone } = userData;

        if (senderName === auth.currentUser?.displayName) {
          console.log("current user data");
        } else {
          store.setUserProfile({
            UID: uid,
            photoURL: photoURL,
            phone: phone,
            displayName: displayName,
            email: email,
          });
        }
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  const handleSetUserProfile = (senderName: string) => {
    store.setProfileClicked(senderName);
    store.handleIsUserProfileActive(true);
    getUserData(UserId, senderName);
  };

  const divRef = React.useRef<any>(null);

  React.useEffect(() => {
    // Scroll to the bottom when the component mounts
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div ref={divRef}>
      <div style={{ display: "flex", gap: "10px", marginLeft: "25px" }}>
        <div>
          <Avatar
            src={
              auth.currentUser?.displayName === senderName
                ? auth.currentUser?.photoURL
                : profilePic
            }
            shape="square"
          />
        </div>
        <div className="special-div">
          <div style={{ display: "flex", gap: "10px" }}>
            <p
              className="chat-message-user-name"
              onClick={() => handleSetUserProfile(senderName)}
            >
              {senderName}
            </p>
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
