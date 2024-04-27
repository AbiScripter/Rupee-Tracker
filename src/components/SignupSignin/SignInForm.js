import React, { useContext, useState } from "react";
import { Button, Card, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import signInUser from "../../utils/signInUtils";
import googleSignIn from "../../utils/googleSignIn";
import createDoc from "../../utils/createDocUtils";
import { UserContext } from "../../context/userContext";

const SignInForm = ({ setIsSignInTab }) => {
  const [form] = Form.useForm();
  const { setUserId } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function handleFormSubmit(data) {
    const userData = await signInUser(data, setIsLoading);
    console.log(userData);
    //if signin succes it return userdata
    //if signin fails it returns null
    if (userData !== null) {
      // localStorage.setItem('username',)

      // console.log(userData);
      setUserId(userData.uid);
      navigate("/dashboard");
    }
    // form.resetFields(); //reset the form
  }

  async function handleGoogleSignIn() {
    const googleData = await googleSignIn(setIsLoading);
    console.log(googleData);
    createDoc(googleData.user, "random");
    navigate("/dashboard");
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
        {/* <Button
          type="primary"
          block
          onClick={handleGoogleSignIn}
          loading={isLoading}
        >
          Sign In with Google
        </Button> */}
      </Form>
    </Card>
  );
};

export default SignInForm;
