import React, { useEffect } from "react";
import "./styles.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Button, message } from "antd";
import { toast } from "react-toastify";
import { reset } from "../../accountSlice";
import { useDispatch } from "react-redux";

// signOut(auth)
//   .then(() => {
//     // Sign-out successful.
//   })
//   .catch((error) => {
//     // An error happened.
//   });
const Header = () => {
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
      throw new Error(error.message);
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  return (
    <div className="nav-bar">
      <h3>Rupee Tracker</h3>
      {user && <Button onClick={handleSignOut}>Sign Out</Button>}
    </div>
  );
};

export default Header;
