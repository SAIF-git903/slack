import React from "react";
import { ClockCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Divider, Popover, Tooltip, Typography } from "antd";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import messageIcon from "../../assets/icons/Message.svg";
import phoneIcon from "../../assets/icons/Call.svg";
import AwayDot from "../Away Status";
import store from "../../Mst/Mst";
import "./style.css";

function Profile() {
  const { Title } = Typography;

  let user: any = auth.currentUser;
  console.log(user);

  return (
    <div>
      <div
        className="centered"
        style={{ justifyContent: "space-between", marginLeft: "15px" }}
      >
        <h3>Profile</h3>
        <Tooltip title="close" placement="bottom">
          <CloseOutlined
            color="grey"
            className="profile-close-icon"
            onClick={() => store.handleIsUserProfileActive(false)}
          />
        </Tooltip>
      </div>
      <Divider style={{ margin: "0" }} />
      <div className="centered">
        <img
          src={user.photoURL}
          alt="profile-pic"
          className="profile-page-pic-avatar"
        />
      </div>
      <div style={{ marginLeft: "20px" }}>
        <div
          className="centered"
          style={{ justifyContent: "space-between", marginRight: "15px" }}
        >
          <Title level={3}>{user.displayName}</Title>
          <a href="#">Edit</a>
        </div>
        <div>
          <div className="user-acive-or-not-div">
            <div className="centered">
              <AwayDot />
            </div>
            <p style={{ fontSize: "15px" }} className="centered">
              Away
            </p>
          </div>
          <div className="user-status-info">
            <ClockCircleOutlined className="centered" />
            <p className="centered">07:08 local time</p>
          </div>
        </div>
      </div>
      <Divider style={{ margin: "4px 4px" }} />
      <div style={{ marginLeft: "20px" }}>
        <h4>Contact Information</h4>
        <div className="contact-info-container">
          <div className="centered contact-icon">
            <img src={messageIcon} alt="message-icon" />
          </div>
          <div style={{ marginRight: "20px" }}>
            <p className="contact-info-para">Email Address</p>
            <Link to={`mailto:${"email"}`} className="contact-linkto">
              <p>{user.email}</p>
            </Link>
          </div>
        </div>
        <div className="contact-info-container">
          <div className="centered contact-icon">
            <img src={phoneIcon} alt="contact-icon" />
          </div>
          <div>
            <p className="contact-info-para">phone</p>
            <Link to={`tel:${"telephone"}`} className="contact-linkto">
              <p>+92 301781892</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
