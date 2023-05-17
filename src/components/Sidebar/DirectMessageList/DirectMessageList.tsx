import ChannelList from "../ChannelList/ChannelList";
import store from "../../../Mst/Mst";
import { observer } from "mobx-react-lite";

function DirectMessageList() {
  return (
    <>
      {store.directMessageUser.map((i) => {
        console.log(i);
        return (
          <ChannelList
            isMessage={true}
            listTitle={i.displayName}
            UserId={i.UID}
            profilePic={i.photoURL}
            phoneNum={i.phone}
            email={i.email}
          />
        );
      })}
    </>
  );
}

export default observer(DirectMessageList);
