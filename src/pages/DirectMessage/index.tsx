import {
  Avatar,
  Divider,
  Dropdown,
  Input,
  Mentions,
  MenuProps,
  Space,
} from "antd";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import "./style.css";
import store from "../../Mst/Mst";

function DirectMessagesPage() {
  const [searchedUser, setSearched] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef<any>();

  useEffect(() => {
    ref.current.focus();
  }, []);

  async function getData(search: string) {
    const q = query(
      collection(db, "users"),
      where("displayName", ">=", search),
      where("displayName", "<=", search + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);
    const users: any[] = [];
    querySnapshot.forEach((doc) => {
      if (search.length) {
        let singleUser = {
          data: doc.data(),
          id: doc.id,
        };
        users.push(singleUser);
      }
    });
    setSearched(users);
    setLoading(false);
  }

  const onSearch = (search: string) => {
    ref.current = search;
    setLoading(!!search);
    getData(search);
  };

  const handleNewDirectMsgUser = (user: {
    data: {
      displayName: string;
      email: string;
      phone?: string;
      photoURL: string;
    };
    id: string;
  }) => {
    console.log(user.data, user.id, "in handle direct msg");
    store.addNewDirectMsgUser({
      UID: user.id,
      displayName: user.data.displayName,
      email: user.data.email,
      phone: user.data.phone,
      photoURL: user.data.photoURL,
    });
  };

  console.log(searchedUser, "user");

  return (
    <div>
      <div style={{ marginLeft: "25px" }}>
        <h3>Direct Messages</h3>
      </div>
      <Divider style={{ margin: "0" }} />
      <div style={{ marginLeft: "25px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <p style={{ color: "grey" }}>To:</p>
          <Mentions
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              boxShadow: "none",
            }}
            loading={loading}
            onSearch={onSearch}
            ref={ref}
            className="centered"
            placeholder="@somebody or somebody@example.com"
            options={searchedUser.map(
              (user: {
                data: {
                  displayName: string;
                  email: string;
                  phone?: string;
                  photoURL: string;
                };
                id: string;
              }) => ({
                key: user.data.displayName,
                value: user.data.displayName,
                className: "antd-demo-dynamic-option",
                label: (
                  <div
                    className="onchange-modal-open"
                    onClick={() => handleNewDirectMsgUser(user)}
                  >
                    <Avatar shape="square" size={"small"} />
                    <strong>{user.data.displayName}</strong>
                  </div>
                ),
              })
            )}
          />
        </div>
      </div>
      <Divider style={{ margin: "0" }} />
    </div>
  );
}

export default DirectMessagesPage;
