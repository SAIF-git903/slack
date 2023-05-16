import { Button, Input, Result } from "antd";
import { Link } from "react-router-dom";
import { Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase/firebaseConfig";
import "./style.css";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { updateProfile } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

function AfterSignUp() {
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [url, setURL] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const navigate = useNavigate();

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  async function setProfilePic() {
    if (fileList.length === 0) {
      return;
    }

    const file: Blob | Uint8Array | ArrayBuffer | any = fileList[0];
    const imageName = `${Date.now()}-${file.name}`;
    const imageRef = ref(storage, imageName);
    await uploadBytes(imageRef, file.originFileObj);
    const downloadURL = await getDownloadURL(imageRef);
    setURL(downloadURL);
  }

  console.log(url, "Url");

  React.useEffect(() => {
    setProfilePic();
  }, [fileList]);

  const handleContinueNavigation = () => {
    if (!auth.currentUser) return;
    if (!auth.currentUser.emailVerified) {
      toast.error("Please Verify Your email address to continue!");
    } else {
      setDoc(doc(db, "users", auth.currentUser.uid), {
        displayName: inputName,
        photoURL: url,
        status: "active",
        email: auth.currentUser.email,
        phone: auth.currentUser.phoneNumber,
      });
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: inputName,
          photoURL: url,
        })
          .then(() => navigate("/"))
          .catch((err) => console.log(err));
      }
    }
  };

  console.log(auth.currentUser);

  return (
    <div>
      <Result
        status="success"
        title="Verification Email sent"
        subTitle={`Verification email link has been sent to ${auth.currentUser?.email}`}
      />
      <div className="centered">
        <div className="personal-detail-verify-container">
          <div className="centered">
            <h4>Display Name</h4>
          </div>
          <div className="centered">
            <Input
              placeholder="Your display name (visible in your profile)"
              style={{
                width: "200px",
              }}
              onChange={(e) => setInputName(e.target.value)}
            />
          </div>
          <div className="centered">
            <h4>Select Profile Picture</h4>
          </div>
          <div className="centered">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              maxCount={1}
            >
              {fileList.length < 5 && "+ Select Pic"}
            </Upload>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "40px", right: "40px" }}>
        <Button
          icon={<ArrowRightOutlined />}
          style={{ border: "none" }}
          onClick={handleContinueNavigation}
        >
          Continue
        </Button>
      </div>
      <div style={{ position: "absolute", bottom: "40px", left: "40px" }}>
        <Button
          icon={<ArrowLeftOutlined />}
          style={{ border: "none" }}
          onClick={() => navigate("/get-started/enter-email")}
        >
          Not You? Sign Up
        </Button>
      </div>
      <Toaster />
    </div>
  );
}

export default AfterSignUp;
