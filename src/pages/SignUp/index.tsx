import React from "react";
import logo from "../../assets/images/logo.png";
import { Form, Input, Button, Typography } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import store from "../../Mst/Mst";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const SignUpEmail = () => {
  const { Title } = Typography;

  const navigate = useNavigate();

  const onFinish = (values: any) => {
    store.setEmailEntered(true);
    navigate("/get-started/enter-password", { state: values.email });
    console.log(values);
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
      <Form
        name="signup1"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="centered" style={{ marginTop: "20px" }}>
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
              }}
            />
          </Form.Item>
        </div>
        <div className="centered" style={{ marginTop: "20px" }}>
          <Form.Item>
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
              htmlType="submit"
            >
              Continue
            </Button>
          </Form.Item>
        </div>
      </Form>
      <div>
        <p className="centered" style={{ fontSize: "14px" }}>
          Already using Slack?
        </p>
        <Link
          to="/already-user/login-to-continue"
          className="centered contact-linkto"
        >
          <p>Sign In to Continue</p>
        </Link>
      </div>
      <Toaster />
    </div>
  );
};

export default SignUpEmail;
