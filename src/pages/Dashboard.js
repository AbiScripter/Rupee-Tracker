import React, { useEffect, useState } from "react";
import { Spin, Button } from "antd";
import Header from "../components/Header";
import { auth, db, doc } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  getDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { initiateStateLogin, reset } from "../slices/accountSlice";
import Expense from "../components/Expense";
import Income from "../components/Income";
import DataTable from "../components/Tables";
import LineGraph from "../components/Charts/LineGraph";
import PieChart from "../components/Charts/PieChart";
import "./Dashboard.css";
import NoTransactions from "../components/NoTransactions";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../slices/userSlice";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const currAccount = useSelector((state) => state.account);
  const currUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [prevUserId, setPrevUserId] = useState(null); // Initialize a state to store the previous userId
  const [userLoading, setUserLoading] = useState(false);
  const navigate = useNavigate();

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

  //!fetching user transaction data

  //!  method using onsnapshot
  useEffect(() => {
    let idIfAvailable = "";

    if (currUser) {
      idIfAvailable = currUser.uid;
    } else {
      idIfAvailable = user.uid;
    }
    const unsubscribe = onSnapshot(
      query(collection(db, `users/${idIfAvailable}/transactions`)),
      (querySnapshot) => {
        const temp = [];
        querySnapshot.forEach((doc) => {
          temp.push({ id: doc.id, ...doc.data() });
        });
        // console.log("yes", temp[0]?.id);
        dispatch(initiateStateLogin(temp[0]));
        dispatch(setUser({ ...currUser, transactionId: temp[0]?.id }));
      },
      (error) => {
        console.error("Error fetching podcasts:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [currUser?.uid]);

  //!another method
  // const fetchTranscations = async (subCollectionRef) => {
  //   try {
  //     console.log("ommaalaokk");
  //     const subCollectionSnapshot = await getDocs(subCollectionRef);
  //     const subCollectionData = subCollectionSnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     console.log(subCollectionData);
  //     dispatch(initiateStateLogin(subCollectionData[0]));
  //     dispatch(
  //       setUser({ ...currUser, transactionId: subCollectionData[0].id })
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // // //!only fetch data at initial render
  // useEffect(() => {
  //   let idIfAvailable = "";
  //   if (currUser) {
  //     idIfAvailable = currUser.uid;
  //   } else {
  //     idIfAvailable = user.uid;
  //   }
  //   const id = setTimeout(() => {
  //     console.log(currUser);
  //     const subCollectionRef = collection(
  //       db,
  //       `users/${idIfAvailable}/transactions`
  //     );
  //     if (idIfAvailable && idIfAvailable !== prevUserId) {
  //       fetchTranscations(subCollectionRef);
  //       setPrevUserId(idIfAvailable); // Update the previous userId
  //     }
  //   }, 1000);

  //   return () => clearTimeout(id);
  // }, [currUser]);

  //

  return (
    <div className="app-container">
      {loading ? (
        <div className="loader">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Header />
          <Button className="sign-out-btn" onClick={handleSignOut}>
            SignOut
          </Button>
          {userLoading ? (
            <div className="loader">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <h2 className="hello-user">
                {userLoading ? " " : `Hello ${currUser?.name} 👋`}
              </h2>
              <div className="content-container">
                <div className="balance-container">
                  <div className="card card-balance">
                    <h3>Balance</h3>
                    <h1>₹{currAccount.currBalance}</h1>
                  </div>
                  <div className="card">
                    <Income />
                  </div>
                  <div className="card">
                    <Expense />
                  </div>
                </div>

                <div className="main-section">
                  {currAccount.expenses.length === 0 &&
                  currAccount.incomes.length === 0 ? (
                    <NoTransactions />
                  ) : (
                    <>
                      <div className="charts-container">
                        <div className="chart line-graph-container">
                          <LineGraph />
                        </div>
                        <div className="chart pie-chart-container">
                          <PieChart />
                        </div>
                      </div>
                      <DataTable />
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
