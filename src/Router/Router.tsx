import { Route, Routes, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Header from "../components/Header/Header";
import SideBar from "../components/Sidebar/SideBar";
import ChatPage from "../pages/Chat";
import DirectMessagesPage from "../pages/DirectMessage";
import SignUpEmail from "../pages/SignUp";
import SignUpPassword from "../pages/SignUp/index2";
import store from "../Mst/Mst";
import logo from "../assets/images/logo.png";
import Profile from "../components/Profile";
import "./style.css";
import { Divider } from "antd";

function Router() {
  const [isLoadingAuthState, setIsLoadingAuthState] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        console.log(`User ${uid} is signed in`);
      } else {
        // User is signed out
        console.log("User is signed out");
      }

      setIsLoadingAuthState(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoadingAuthState) {
    return (
      <div className="centered" style={{ height: "100vh" }}>
        <img
          src={logo}
          alt="splash-logo"
          style={{ width: "30%", height: "30%", objectFit: "contain" }}
        />
      </div>
    );
  }

  return (
    <div className="router-route-cont">
      {!auth.currentUser ? (
        <Routes>
          <Route
            path="get-started/*"
            element={<Navigate to="/get-started/enter-email" replace />}
          />
          <Route path="get-started">
            <Route path="enter-email" element={<SignUpEmail />} />
            {store.isEmailEntered && (
              <Route path="enter-password" element={<SignUpPassword />} />
            )}
          </Route>
          <Route
            path="*"
            element={<Navigate to="/get-started/enter-email" replace />}
          />
        </Routes>
      ) : (
        <>
          <Header />
          <div className="main-container">
            <div className="sidebar-main-container">
              <SideBar />
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ width: "100%" }}>
                <Routes>
                  <Route path="/" element={<DirectMessagesPage />} />
                  <Route path="/:userId" element={<ChatPage />} />
                </Routes>
              </div>
              <div style={{ width: "45%", borderLeft: "1px solid grey" }}>
                <Profile />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default observer(Router);
