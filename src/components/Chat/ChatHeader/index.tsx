import { Avatar, Badge, Divider } from "antd";
import "./style.css";

function ChatHeader({receiverName} : any) {
  return (
    <>
      <div className="chatheader-avatar-style">
        <div className="centered">
          <Badge dot color={"green"}>
            <Avatar
              shape="square"
              size={"small"}
              src="https://ca.slack-edge.com/T03A7U0BX41-U04AM2QLZCZ-1bcd531b1e51-512"
            />
          </Badge>
        </div>
        <div className="centered">
          <h3>{receiverName}</h3>
        </div>
      </div>
      <Divider style={{ margin: "10px 0 0 0 " }} />
    </>
  );
}

export default ChatHeader;
