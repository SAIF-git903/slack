import React from "react";
import "./style.css";
import {
  Avatar,
  Badge,
  Input,
  Button,
  Typography,
  Popover,
  Tooltip,
  Dropdown,
  Space,
  MenuProps,
} from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";

function Header() {
  const items: MenuProps["items"] = [
    {
      label: (
        <div style={{ display: "flex", gap: "10px", width: "200px" }}>
          <div>
            <Avatar
              src="https://ca.slack-edge.com/T03A7U0BX41-U04AM2QLZCZ-1bcd531b1e51-512"
              shape="square"
            />
          </div>
          <div className="special-div">
            <p style={{ marginTop: "0px", fontWeight: "bold" }}>{"Saif Ali"}</p>
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
      label: "Profile",
      key: "3",
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
          <Tooltip title={"Saif Ali"}>
            <Badge dot offset={[-5, 25]} color="green">
              <Avatar shape="square" icon={<UserOutlined />} />
            </Badge>
          </Tooltip>
        </div>
      </Dropdown>
    </div>
  );
}

export default Header;
