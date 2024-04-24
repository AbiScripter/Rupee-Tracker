import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { auth, db, doc } from "../firebase";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import Expense from "../components/Expense";
import Income from "../components/Income";
import DataTable from "../components/Tables";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { initiateStateLogin } from "../accountSlice";
import { UserContext } from "../context/userContext";
import LineGraph from "../components/Charts/LineGraph";

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

  // ! /////////////////////////////
  // const getUserInfo = async () => {
  //   try {
  //     const ref = collection(db, "users", userId, "transactions");
  //     const data = await getDocs(ref);
  //     const filteredData = data.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     console.log(filteredData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // ! /////////////////////////////

  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          <Header />

          <h1>{userId}</h1>
          <h3>Current Balance: {currAccount.currBalance}</h3>
          <Income />
          <Expense />
          <DataTable />
        </div>
      )}

      <LineGraph />
    </div>
  );
};

export default Dashboard;
