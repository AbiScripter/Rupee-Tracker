import React, { useContext, useEffect } from "react";
import "./styles.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Button } from "antd";
import { toast } from "react-toastify";
import { reset } from "../../accountSlice";
import { useDispatch } from "react-redux";
import { UserContext } from "../../context/userContext";
import Logo from "../Logo/Logo";
const Header = () => {
  const { setUserId } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(auth);

  async function handleSignOut() {
    try {
      await signOut(auth);
      dispatch(reset());
      // Sign-out successful.
      navigate("/");
      toast.success("signed out");
    } catch (error) {
      // An error happened.
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (user) {
      // console.log("from header", user);
      setUserId(user.uid);
      navigate("/dashboard");
    }
  }, [user, loading]);

  return (
    <div className="nav-bar">
      {/* <h2 className="app-logo">Rupee Tracker</h2> */}
      <Logo />
      {user && <Button onClick={handleSignOut}>Sign Out</Button>}
    </div>
  );
};

export default Header;
