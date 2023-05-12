import { Input } from "antd";
import React, { useEffect, useRef, useState } from "react";

function ChatHeader() {
  const [search, setSearch] = useState("");
  const inputRef = useRef<any>("");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Input
      placeholder="search person"
      onChange={(e) => setSearch(e.target.value)}
      ref={inputRef}
    />
  );
}

export default ChatHeader;
