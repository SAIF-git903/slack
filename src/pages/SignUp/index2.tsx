import React from "react";
import logo from "../../assets/images/logo.png";
import { Button, Input, Typography } from "antd";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  ActionCodeSettings,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useLocation } from "react-router-dom";

function SignUpPassword() {
  const { Title } = Typography;
  const location = useLocation();

  const { state } = location;
  const [inputPassword, setInputPassword] = React.useState<string>("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, state, inputPassword).then(
      (userCredetial) => {
        console.log(userCredetial);
        signInWithEmailAndPassword(auth, state, inputPassword).then(
          (userCredetial) => {
            const user = auth.currentUser;

            const actionCodeSettings: ActionCodeSettings = {
              url: "https://3548-103-131-212-131.ngrok-free.app/get-started/enter-email",
              handleCodeInApp: true,
            };

            if (user) {
              sendEmailVerification(user, actionCodeSettings)
                .then(() => {
                  console.log(
                    "Verification code sent to " + auth.currentUser?.email
                  );
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
        );
      }
    );
  };

  // sendEmailVerification(auth.currentUser)
  //   .then(() => {
  //     // Email verification sent, set state to show message
  //     console.log("Email verification sent to " + email);
  //   })
  //   .catch((error) => {
  //     // Handle error
  //     console.log(error);
  //   });

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
          type="primary"
          block
          onClick={handleSignUp}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default SignUpPassword;
