import React from "react";
import { Avatar, Badge, Tooltip, Dropdown, MenuProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import store from "../../Mst/Mst";
import profileIcon from "../../assets/icons/Profile.svg";
import logoutIcon from "../../assets/icons/Logout.svg";
import "./style.css";

function Header() {
  const handleLogoutUser = () => {
    signOut(auth)
      .then(() => store.setEmailEntered(false))
      .catch((err) => console.log(err));
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div style={{ display: "flex", gap: "10px", width: "200px" }}>
          <div>
            <Avatar src={auth.currentUser?.photoURL} shape="square" />
          </div>
          <div className="special-div">
            <p style={{ marginTop: "0px", fontWeight: "bold" }}>
              {auth.currentUser?.displayName}
            </p>
            <p style={{ marginTop: "-18px", fontSize: "12px" }}>Active</p>
          </div>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div
          style={{
            height: "15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <p>
            Set yourself as <strong>active</strong>
          </p>
        </div>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div className="contact-icon header-icons">
          <img src={profileIcon} alt="contact-icon" />
          <div className="centered">
            <p>Profile</p>
          </div>
        </div>
      ),
      key: "3",
      onClick: () => {
        store.handleIsUserProfileActive(true);
        if (auth.currentUser) {
          store.setUserProfile({
            UID: auth.currentUser?.uid,
            photoURL: auth.currentUser?.photoURL || "",
            phone: auth.currentUser?.phoneNumber,
            displayName: auth.currentUser?.displayName || "",
            email: auth.currentUser?.email || "",
          });
        }
      },
    },
    {
      label: (
        <div className="contact-icon header-icons">
          <img src={logoutIcon} alt="contact-icon" />
          <div className="centered">
            <p>Logout</p>
          </div>
        </div>
      ),
      key: "4",
      onClick: handleLogoutUser,
    },
  ];

  return (
    <div className="main-top-nav top-nav-flex">
      <div>clock</div>
      <div>
        <div className="header-search-button">
          <p
            className="centered"
            style={{ marginLeft: "5px", fontSize: "13px" }}
          >
            Search Enigmatix Trainee
          </p>
          <SearchOutlined
            size={25}
            className="centered"
            style={{ marginRight: "5px" }}
          />
        </div>
      </div>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <div style={{ marginRight: "20px", cursor: "pointer" }}>
          <Tooltip title={auth.currentUser?.displayName}>
            <Badge dot offset={[-5, 25]} color="green">
              <Avatar shape="square" src={auth.currentUser?.photoURL} />
            </Badge>
          </Tooltip>
        </div>
      </Dropdown>
    </div>
  );
}

export default Header;
