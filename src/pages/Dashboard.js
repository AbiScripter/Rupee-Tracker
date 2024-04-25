import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Divider, Card } from "antd";
import Header from "../components/Header";
import { auth, db, doc } from "../firebase";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { initiateStateLogin } from "../accountSlice";
import { UserContext } from "../context/userContext";
import Expense from "../components/Expense";
import Income from "../components/Income";
import DataTable from "../components/Tables";
import LineGraph from "../components/Charts/LineGraph";
import PieChart from "../components/Charts/PieChart";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const currAccount = useSelector((state) => state.account);
  // console.log("from dashboard........", currAccount);
  const dispatch = useDispatch();
  const { userId, setTransactionId } = useContext(UserContext);
  const [prevUserId, setPrevUserId] = useState(null); // Initialize a state to store the previous userId

  //!fetching user data
  const fetchTranscations = async (subCollectionRef) => {
    try {
      const subCollectionSnapshot = await getDocs(subCollectionRef);
      const subCollectionData = subCollectionSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(subCollectionData);
      dispatch(initiateStateLogin(subCollectionData[0]));
      setTransactionId(subCollectionData[0]?.id);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  //!only fetch data at initial render
  useEffect(() => {
    const id = setTimeout(() => {
      const subCollectionRef = collection(db, `users/${userId}/transactions`);
      if (userId && userId !== prevUserId) {
        fetchTranscations(subCollectionRef);
        setPrevUserId(userId); // Update the previous userId
      }
    }, 1000);

    return () => clearTimeout(id);
  }, [userId, prevUserId]);

  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          <Header />
          {/* <h1>{userId}</h1> */}

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

          <div className="charts-container">
            <div className="chart line-graph-container">
              <LineGraph />
            </div>
            <div className="chart pie-chart-container">
              <PieChart />
            </div>
          </div>
          <DataTable />
        </div>
      )}
    </>
  );
};

export default Dashboard;

// Extra small devices (portrait phones, less than 576px)
// No media query since this is the default in BootstrapXS

// Small devices (landscape phones, 576px and up)SM
// @media (min-width: 576px) { ... }

// Medium devices (tablets, 768px and up)MD
// @media (min-width: 768px) { ... }

// Large devices (desktops, 992px and up)LG
// @media (min-width: 992px) { ... }

// Extra large devices (large desktops, 1200px and up)Xl
// @media (min-width: 1200px) { ... }
