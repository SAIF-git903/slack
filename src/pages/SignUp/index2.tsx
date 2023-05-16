import React from "react";
import logo from "../../assets/images/logo.png";
import { Button, Input, Typography } from "antd";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import { useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

function SignUpPassword() {
  const { Title } = Typography;
  const location = useLocation();
  const navigate = useNavigate();

  const { state } = location;
  const [inputPassword, setInputPassword] = React.useState<string>("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSignUp = () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, state, inputPassword)
      .then((userCredetial) => {
        if (userCredetial.user) {
          // const
          // setDoc(ref)

          sendEmailVerification(userCredetial.user)
            .then(() => {
              setIsLoading(false);
              navigate(
                `/get-started/email-verified/${userCredetial.user.emailVerified}`
              );
              console.log(
                "Verification code sent to " + auth.currentUser?.email
              );
            })
            .catch((err) => {
              setIsLoading(false);
              console.log(err);
            });
        }
      })
      .catch((err) => {
        toast.error(err.message, { position: "top-left" });
      });
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <div className="centered">
        <img
          src={logo}
          style={{ width: "140px", height: "60px", objectFit: "contain" }}
          alt="app_logo"
        />
      </div>
      <div className="centered">
        <Title level={1} style={{ fontWeight: "bold", fontSize: "43px" }}>
          Enter your password for future use.
        </Title>
      </div>
      <div className="centered" style={{ gap: "5px", marginTop: "-30px" }}>
        <Title
          level={5}
          style={{
            fontSize: "18px",
            color: "grey",
            width: "400px",
            textAlign: "center",
          }}
        >
          Please make sure to remember your password or store it securely using
          a password manager.
          <span style={{ color: "#454245" }}>
            Do not share your password with anyone
          </span>
        </Title>
      </div>
      <div className="centered" style={{ marginTop: "20px" }}>
        <Input.Password
          placeholder="e.g.2j93ma01ls"
          style={{ width: "400px", height: "45px", fontSize: "19px" }}
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
          onChange={(e) => setInputPassword(e.target.value)}
        />
      </div>
      <div className="centered" style={{ marginTop: "20px" }}>
        <Button
          style={{
            width: "400px",
            height: "40px",
            fontWeight: "bold",
            fontSize: "18px",
            borderRadius: "4px",
            background: "#611f69",
          }}
          loading={isLoading}
          type="primary"
          block
          onClick={handleSignUp}
        >
          Submit
        </Button>
      </div>
      <Toaster />
    </div>
  );
}

export default SignUpPassword;
