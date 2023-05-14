import React, {useEffect} from "react";
import ChannelList from "../ChannelList/ChannelList";
import store from "../../../Mst/Mst";
import { observer } from "mobx-react-lite";
import { useNavigate, useLocation } from "react-router-dom";

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
