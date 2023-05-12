import { PoweroffOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import "./style.css";

function ChatInput() {
  return (
    <div className="centered">
      <div className="chat-input-container centered">
        <Input placeholder="Message Ali Hamza" className="chat-input-input" />
        <Button
          type="primary"
          style={{ background: "#007a5a", marginRight: "10px" }}
          icon={<SendOutlined />}
        />
      </div>
    </div>
  );
}

export default ChatInput;
