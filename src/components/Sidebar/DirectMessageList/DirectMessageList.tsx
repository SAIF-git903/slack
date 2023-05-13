import React from "react";
import ChannelList from "../ChannelList/ChannelList";
import store from "../../../Mst/Mst";
import { observer } from "mobx-react-lite";

function DirectMessageList() {
  return (
    <>
      {store.directMessageUser.map((i) => {
        return <ChannelList isMessage={true} listTitle={i.displayName} UserId={i.UID} />;
      })}
    </>
  );
}

export default observer(DirectMessageList);
