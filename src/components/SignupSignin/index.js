import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import "./style.css";

const SignUpSignIn = () => {
  const [isSignInTab, setIsSignInTab] = useState(false);

  return (
    <div className="form-containers">
      {!isSignInTab ? (
        <SignUpForm setIsSignInTab={setIsSignInTab} />
      ) : (
        <SignInForm setIsSignInTab={setIsSignInTab} />
      )}
    </div>
  );
};

export default SignUpSignIn;
