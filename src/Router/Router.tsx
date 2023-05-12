// import {
//   collection,
//   getDocs,
//   where,
//   query,
//   doc,
//   setDoc,
// } from "@firebase/firestore";
import Header from "../components/Header/Header";
import SideBar from "../components/Sidebar/SideBar";
import Chat from "../components/Chat/Chat.";
import "./style.css";
import { Route, Routes } from "react-router-dom";
import ChatPage from "../pages/Chat";
import DirectMessagesPage from "../pages/DirectMessage";

function Router() {
  // let participantId = "9tGXtUlfYKbuQpJCGgQZCzcb0v33";

  // const createChatRoom = async (participantId: string) => {
  //   // Create a new chat document with a unique ID
  //   const newChatRef = doc(collection(db, "chats"));

  //   // Add the authenticated user and the selected participant to the chat participants subcollection
  //   await setDoc(
  //     doc(newChatRef, "participants", "KvRpCd8U4JfICCOsrZPec20DO433"),
  //     { active: true }
  //   );
  //   await setDoc(doc(newChatRef, "participants", participantId), {
  //     active: true,
  //   });

  //   console.log(newChatRef.id); // Return the ID of the new chat room document
  // };

  // useEffect(() => {
  //   createChatRoom(participantId);
  //   // async function getData() {
  //   //   const q = query(
  //   //     collection(db, "users")
  //   //     // where("displayName", "==", "Saif")
  //   //   );
  //   //   const querySnapshot = await getDocs(q);
  //   //   querySnapshot.forEach((doc) => {
  //   //     // doc.data() is never undefined for query doc snapshots
  //   //     console.log(doc.id, " => ", doc.data());
  //   //   });
  //   // }
  //   // getData();
  // }, []);

  return (
    <div className="router-route-cont">
      <Header />
      <div className="main-container">
        <div className="sidebar-main-container">
          <SideBar />
        </div>
        <div style={{ width: "100%" }}>
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/direct-message" element={<DirectMessagesPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Router;
