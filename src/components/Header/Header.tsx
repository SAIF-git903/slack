import React from "react";
import "./style.css";
import { Avatar, Badge, Input, Button, Typography } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";

function Header() {
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
      <div style={{ marginRight: "20px" }}>
        <Badge dot>
          <Avatar shape="square" icon={<UserOutlined />} />
        </Badge>
      </div>
    </div>
  );
}

export default Header;
