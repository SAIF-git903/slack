import React from "react";
import logo from "../../assets/images/logo.png";
import { Button, Input, Typography } from "antd";

const SignUp = () => {
  const { Title } = Typography;

  return (
    <div style={{ marginTop: "30px" }}>
      <div className="centered">
        <img
          src={logo}
          style={{ width: "140px", height: "60px", objectFit: "contain" }}
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
          style={{ width: "400px", height: "45px", fontSize: "19px" }}
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
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
