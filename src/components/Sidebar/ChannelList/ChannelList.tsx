import React from "react";
import { Avatar } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { SideBarListItemProps } from "../../../utils/types/type";
import { useNavigate } from "react-router-dom";
import "./style.css";

const ChannelList = ({
  isMessage,
  listTitle,
  UserId,
  onClick,
  profilePic,
  phoneNum,
  email,
}: SideBarListItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/client/${UserId}`, {
      state: { listTitle, UserId, profilePic, phoneNum, email },
    });
  };

  return (
    <div
      className="channelList-main-container"
      onClick={onClick || handleClick}
    >
      <div className="channelList-sub-container">
        {!isMessage ? (
          <div className="centered" style={{ paddingLeft: "10px" }}>
            <LockOutlined />
          </div>
        ) : (
          <div className="centered" style={{ marginLeft: "5px" }}>
            <Avatar shape="square" src={profilePic} size={"small"} />
          </div>
        )}
        <div className="channel-list-para-div">
          <p className="channel-list-para" style={{ textAlign: "start" }}>
            {listTitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChannelList;
