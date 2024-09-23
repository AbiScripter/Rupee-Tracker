import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
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

  //!initiate user data
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      //onSnapshot is the method for real time data collection
      const docRef = doc(db, "users", user.uid);
      const unsubscribeSnapshot = onSnapshot(
        docRef,
        (userDoc) => {
          if (!userDoc.exists()) return;
          //initiate the userdata with uid ,if its alrady singed initiate those data[cart,wishlist etc]
          dispatch(initiateUser(userDoc.data()));
        },
        (error) => console.error("Error fetching user data:", error)
      );

      return unsubscribeSnapshot;
    });

    return unsubscribeAuth;
  }, [dispatch]);

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
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export const genRandomKey = () => {
  return Math.floor(Math.random() * 100000);
};

export default App;
