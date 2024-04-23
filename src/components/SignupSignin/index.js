import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const SignUpSignIn = () => {
  const [isSignInTab, setIsSignInTab] = useState(false);

  return (
    <div>
      {!isSignInTab ? (
        <SignUpForm setIsSignInTab={setIsSignInTab} />
      ) : (
        <SignInForm setIsSignInTab={setIsSignInTab} />
      )}
    </div>
  );
};

export default SignUpSignIn;
