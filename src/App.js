import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { initiateUser } from "./slices/userSlice";
import PrivateRoutes from "./components/PrivateRoutes";
import Signup from "./pages/Signup";
import Loader from "./components/Loader";
// import Dashboard from "./pages/Dashboard";

//!code splitting
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.user.user);

  //!initiate user data
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              console.log(userData);
              dispatch(
                initiateUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                  transactionId: "",
                })
              );
            }
          },
          (error) => {
            console.error("Error fetching user data:", error);
          }
        );

        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, [dispatch]);

  console.log(currUser);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={true}
      />

      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>{" "}
        </Suspense>
      </Router>
    </>
  );
}

export const genRandomKey = () => {
  return Math.floor(Math.random() * 100000);
};

export default App;
