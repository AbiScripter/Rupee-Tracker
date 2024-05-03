import React, { useState } from "react";
import { Button, Card, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import signInUser from "../../utils/signInUtils";
import GoogleLoginForm from "./GoogleLoginForm";

const SignInForm = ({ setIsSignInTab }) => {
  const [form] = Form.useForm();
  // const { setUserId } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleFormSubmit(data) {
    const user = await signInUser(data, setIsLoading);
    //if signin success it return userdata
    //if signin fails it returns null
    if (user !== null) {
      navigate("/dashboard");
    }
  }

  return (
    <Card className="signin-form-container">
      <h2>Hi, Welcome Back 👋</h2>
      <Form
        onFinish={handleFormSubmit}
        form={form}
        // variant="filled"
        style={{ maxWidth: 600 }}
        layout="vertical"
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input placeholder="Enter Your Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Enter Your Password" />
        </Form.Item>

        <Button type="primary" block htmlType="submit" loading={isLoading}>
          Login
        </Button>
        <p>
          Don't have an acoount ?&nbsp;
          <span
            className="form-link"
            onClick={() => setIsSignInTab((prev) => !prev)}
          >
            Sign Up
          </span>
        </p>
        <GoogleLoginForm />
      </Form>
    </Card>
  );
};

export default SignInForm;
