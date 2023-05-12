import { Divider, Input } from "antd";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import "./style.css";

function DirectMessagesPage() {
  const InputRef = React.useRef<any>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedUser, setSearched] = useState<any>([]);

  useEffect(() => {
    InputRef.current.focus();
  }, []);

  async function getData() {
    console.log(searchTerm, "search");
    const q = query(
      collection(db, "users"),
      where("displayName", ">=", searchTerm),
      where("displayName", "<=", searchTerm + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // setSearched(doc.data());
      console.log(doc.data());
    });
  }

  console.log(searchedUser);

  return (
    <div>
      <div style={{ marginLeft: "25px" }}>
        <h3>Direct Messages</h3>
      </div>
      <Divider style={{ margin: "0" }} />
      <div style={{ marginLeft: "25px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <p style={{ color: "grey" }}>To:</p>
          <input
            className="direct-msg-page-inp"
            placeholder="@somebody or somebody@example.com"
            ref={InputRef}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              getData();
            }}
          />
        </div>
      </div>
      <Divider style={{ margin: "0" }} />
      <div className="search-result-user"></div>
    </div>
  );
}

export default DirectMessagesPage;
