import { Avatar } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { SideBarListItemProps } from "../../../utils/types/type";
import "./style.css";

const ChannelList = ({ isMessage, listTitle }: SideBarListItemProps) => {
  return (
    <div className="channelList-main-container">
      <div className="channelList-sub-container">
        {!isMessage ? (
          <div className="centered" style={{ paddingLeft: "10px" }}>
            <LockOutlined />
          </div>
        ) : (
          <div className="centered" style={{ marginLeft: "5px" }}>
            <Avatar shape="square" size={"small"} />
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
