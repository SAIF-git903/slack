import React from "react";
import logo from "../../assets/images/logo.png";
import { Button, Input, Typography } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import store from "../../Mst/Mst";
import toast, { Toaster } from "react-hot-toast";

const SignUpEmail = () => {
  const { Title } = Typography;

  const [inputEmail, setInputEmail] = React.useState<string>("");
  const navigate = useNavigate();

  function validateEmail(email: string) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  }

  const handleSignUp = () => {
    if (validateEmail(inputEmail) === true) {
      store.setEmailEntered(true);
      navigate("/get-started/enter-password", { state: inputEmail });
    }
    toast.error("Email is invalid!", {
      position: "top-right",
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
          First, enter your email
        </Title>
      </div>
      <div className="centered" style={{ gap: "5px", marginTop: "-30px" }}>
        <Title level={5} style={{ fontSize: "18px", color: "grey" }}>
          We suggest using the{" "}
          <span style={{ color: "#454245" }}>
            email address you use at work.
          </span>
        </Title>
      </div>
      <div className="centered" style={{ marginTop: "20px" }}>
        <Input
          placeholder="name@work-email.com"
          required
          style={{ width: "400px", height: "45px", fontSize: "19px" }}
          onChange={(e) => setInputEmail(e.target.value)}
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
          Continue
        </Button>
      </div>
      <Toaster />
    </div>
  );
};

export default SignUpEmail;
