import { Avatar, Badge, Divider } from "antd";
import "./style.css";

function ChatHeader({ receiverName , receiverData}: any) {
  return (
    <>
      <div className="chatheader-avatar-style">
        <div className="centered">
          <Badge dot color={"green"}>
            <Avatar
              shape="square"
              size={"small"}
              src={receiverData.profilePic}
            />
          </Badge>
        </div>
        <div className="centered">
          <h3>{receiverName}</h3>
        </div>
      </div>
      <Divider style={{ margin: "17px 0 0 0 " }} />
    </>
  );
}

export default ChatHeader;
