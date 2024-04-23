import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import signUpUser from "../../utils/signUpUtils";
import createDoc from "../../utils/createDocUtils";
import googleSignIn from "../../utils/googleSignIn";
import { useDispatch, useSelector } from "react-redux";
import { updateUserId } from "../../accountSlice";
import { UserContext } from "../../context/userContext";

const SignUpForm = ({ setIsSignInTab }) => {
  const { setUsserId } = useContext(UserContext);
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function handleFormSubmit(data) {
    const userData = await signUpUser(data, setIsLoading);
    //if signin succes it return userdata
    //if signin fails it returns null
    if (userData !== null) {
      console.log(userData);
      createDoc(userData, data.username, account);
      // dispatch(updateUserId(userData.uid));
      setUsserId(userData.uid);

      // Navigate to the dashboard page
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
    <div>
      <h3>
        Sign Up with <span style={{ color: "orange" }}> Rupee Tracker</span>
      </h3>
      <Form
        onFinish={handleFormSubmit}
        form={form}
        variant="filled"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
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
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" block htmlType="submit" loading={isLoading}>
          Sign Up
        </Button>

        <p>
          Already have an account
          <button onClick={() => setIsSignInTab((prev) => !prev)}>
            SignIn
          </button>
        </p>
        <Button
          type="primary"
          block
          onClick={handleGoogleSignIn}
          loading={isLoading}
        >
          Sign Up with Google
        </Button>
      </Form>
    </div>
  );
};

export default SignUpForm;
