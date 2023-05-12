import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { ReactNode } from "react";
import { db } from "../../firebase/firebaseConfig";
import ChannelList from "./ChannelList/ChannelList";
import DirectMessageList from "./DirectMessageList/DirectMessageList";
import ItemDropDown from "./ItemDropDown";

type SideBarProps = {
  children: ReactNode;
};

const SideBar = () => {
  async function getData() {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ marginTop: "30px" }}>
      <SideComponent>
        <ItemDropDown title="Channel" isPlus={false} />
        <ChannelList isMessage={false} listTitle={"assesment-test-interns"} />
        <div style={{ marginTop: "20px" }}>
          <ItemDropDown title="Direct Message" isPlus={true} />
          <DirectMessageList />
        </div>
      </SideComponent>
    </div>
  );
};

const SideComponent = (props: SideBarProps) => {
  return <div>{props.children}</div>;
};

export default SideBar;
