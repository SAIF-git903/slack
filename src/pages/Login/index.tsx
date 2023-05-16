import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { toast, Toaster } from "react-hot-toast";
import store from "../../Mst/Mst";

const { Title } = Typography;

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinish = (values: { email: string; password: string }) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        store.setUserEmailVerified(res.user.emailVerified);
      })
      .catch((err) => {
        toast.error(err.message, { position: "top-left" });
        setIsLoading(false);
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo: object) => {
    console.log("Failed:", errorInfo);
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
          Sign In to Slack
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
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="centered">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please fill in your email." },
              { type: "email", message: "Sorry, but that email is invalid!" },
            ]}
          >
            <Input
              placeholder="name@work-email.com"
              style={{
                width: "400px",
                height: "45px",
                fontSize: "19px",
                marginTop: "30px",
              }}
            />
          </Form.Item>
        </div>
        <div className="centered">
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please fill in your password." },
            ]}
          >
            <Input.Password
              placeholder="e.g.2j93ma01ls"
              style={{ width: "400px", height: "45px", fontSize: "19px" }}
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </Form.Item>
        </div>
        <Form.Item>
          <div className="centered">
            <Button
              loading={isLoading}
              style={{
                width: "400px",
                height: "40px",
                fontWeight: "bold",
                fontSize: "18px",
                borderRadius: "4px",
                background: "#611f69",
                marginTop: "20px",
              }}
              type="primary"
              htmlType="submit"
            >
              Sign In
            </Button>
          </div>
        </Form.Item>
      </Form>
      <div>
        <p className="centered" style={{ fontSize: "14px" }}>
          New to Slack?
        </p>
        <Link to="/get-started/enter-email" className="centered contact-linkto">
          <p>Create an account</p>
        </Link>
      </div>
      <Toaster />
    </div>
  );
};

export default LoginForm;
