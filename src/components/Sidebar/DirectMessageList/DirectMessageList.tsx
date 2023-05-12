import React from "react";
import ChannelList from "../ChannelList/ChannelList";

function DirectMessageList() {
  return <ChannelList isMessage={true} listTitle={"Saif Ali"} />;
}

export default DirectMessageList;
