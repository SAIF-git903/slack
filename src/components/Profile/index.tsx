import { ClockCircleOutlined } from "@ant-design/icons";
import { Divider, Typography } from "antd";
import React from "react";
import AwayDot from "../Away Status";

function Profile() {
  const { Title } = Typography;

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <div
        style={{ marginLeft: "25px", justifyContent: "space-between" }}
        className="centered"
      >
        <h3>Profile</h3>
        <p>icon</p>
      </div>
      <Divider style={{ margin: "0" }} />
      <div className="centered">
        <img
          src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
          alt="profile-pic"
          style={{
            width: "300px",
            height: "200px",
            objectFit: "contain",
          }}
        />
      </div>
      <div style={{ marginLeft: "20px" }}>
        <div className="centered" style={{ justifyContent: "space-between" }}>
          <Title level={3}>Saif Ali</Title>
          <a href="#">Edit</a>
        </div>
        <div>
          <div style={{ display: "flex" }}>
            <div style={{ background: "red" }}>
              <AwayDot />
            </div>
            <p style={{ fontSize: "15px" }} className="centered">
              Away
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: "5px",
              height: "30px",
              marginTop: "-10px",
              fontSize: "15px",
            }}
          >
            <ClockCircleOutlined className="centered" />
            <p className="centered">07:08 local time</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
