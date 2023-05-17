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
import PageNotAccessed from "../pages/PageNotAccessed";
import LoginForm from "../pages/Login";
import AfterSignUp from "../pages/AfterSignUp";
import "./style.css";

function Router() {
  const [isLoadingAuthState, setIsLoadingAuthState] = useState(true);
  const [isUserAuthenticated, setIsUserAutheticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        setIsUserAutheticated(true);
        console.log(`User ${uid} is signed in`);

        setInterval(async () => {
          await user.reload(); // Refresh the user's data from the server

          if (user.emailVerified) {
            console.log("User's email has been verified.");
          } else {
            // navigate("/get-started/email-verified/false"); // Redirect unverified user to the email verification screen
            console.log("User's email has not been verified.");
          }
        }, 10000);
      } else {
        // User is signed out
        console.log("User is signed out");
        setIsUserAutheticated(false);
      }

      setIsLoadingAuthState(false);
    });

    return () => unsubscribe();
  }, []);

  let isEmailVerified: any = auth.currentUser && auth.currentUser.emailVerified;

  if (isLoadingAuthState) {
    return (
      <div className="centered" style={{ height: "100vh" }}>
        <img src={logo} alt="splash-logo" className="loading-auth-img" />
      </div>
    );
  }

  return (
    <div className="router-route-cont">
      {!auth.currentUser?.displayName && !isEmailVerified ? (
        <Routes>
          <Route
            path="get-started/*"
            element={<Navigate to="/get-started/enter-email" replace />}
          />
          <Route path="get-started">
            <Route path="enter-email" element={<SignUpEmail />} />
            <Route path="email-verified/:boolean" element={<AfterSignUp />} />
            {store.isEmailEntered && (
              <Route path="enter-password" element={<SignUpPassword />} />
            )}
          </Route>
          <Route path="already-user">
            <Route path="login-to-continue" element={<LoginForm />} />
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
                  <Route path="/client/:userId" element={<ChatPage />} />
                  <Route
                    path="get-started/enter-password"
                    element={<Navigate to="/" replace />}
                  />
                  <Route
                    path="already-user/login-to-continue"
                    element={<Navigate to="/" replace />}
                  />
                  <Route path="*" element={<PageNotAccessed />} />
                </Routes>
              </div>
              {store.isUserProfileActive && (
                <div className="profile-comp-div">
                  <Profile />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default observer(Router);
