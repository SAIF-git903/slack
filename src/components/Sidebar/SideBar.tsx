import { Divider } from "antd";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { ReactNode } from "react";
import { db } from "../../firebase/firebaseConfig";
import ChannelList from "./ChannelList/ChannelList";
import DirectMessageList from "./DirectMessageList/DirectMessageList";
import ItemDropDown from "./ItemDropDown";
import { useNavigate } from "react-router-dom";

type SideBarProps = {
  children: ReactNode;
};

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: "30px" }}>
      <SideComponent>
        <ChannelList
          isMessage={false}
          listTitle="Direct messages"
          onClick={() => navigate("/")}
        />
        <Divider />
        <ItemDropDown title="Channel" isPlus={false} />
        <ChannelList
          isMessage={false}
          listTitle={"assesment-test-interns"}
          onClick={() => ""}
        />
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
