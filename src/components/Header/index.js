import React, { useEffect } from "react";
import "./styles.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
const Header = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  //!if the user not signed out, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  return (
    <div className="nav-bar">
      <Logo />
    </div>
  );
};

export default Header;
