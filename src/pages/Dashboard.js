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

const Dashboard = () => {
  const dispatch = useDispatch();
  const { usserId, setUsserId, transId, setTransId } = useContext(UserContext);

  // const userId = useSelector((state) => state.account.currUserId);

  // const [transactions, setTransactions] = useState([]);
  const reduxAccount = useSelector((state) => state.account);
  const [prevUserId, setPrevUserId] = useState(null); // Initialize a state to store the previous userId
  // const [transactionId, setTransactionId] = useState("");

  //!fetching user data
  const fetchTranscations = async (subCollectionRef) => {
    try {
      const subCollectionSnapshot = await getDocs(subCollectionRef);
      const subCollectionData = subCollectionSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(subCollectionData);
      dispatch(initiateStateLogin(subCollectionData[0]));

      // console.log(subCollectionData[0].id);
      // setTransactionId(subCollectionData[0]?.id);
      setTransId(subCollectionData[0]?.id);

      // setTransactions(subCollectionData);
    } catch (error) {
      console.error(error);
    }
  };

  //!only fetch data at initial render
  useEffect(() => {
    const id = setTimeout(() => {
      const subCollectionRef = collection(db, `users/${usserId}/transactions`);
      if (usserId && usserId !== prevUserId) {
        fetchTranscations(subCollectionRef);
        setPrevUserId(usserId); // Update the previous userId
      }
    }, 2000);
    return () => clearTimeout(id);
  }, [usserId, prevUserId]);

  //!update every transcations to firestore database
  // const updateTransactions = async (
  //   parentCollection,
  //   parentId,
  //   subcollectionName,
  //   documentId,
  //   newData
  // ) => {
  //   console.log("transactionId", documentId);
  //   try {
  //     const docRef = doc(
  //       db,
  //       `${parentCollection}/${parentId}/${subcollectionName}`,
  //       documentId
  //     );
  //     await updateDoc(docRef, {
  //       currBalance: newData.currBalance,
  //       expenses: newData.expenses,
  //       incomes: newData.incomes,
  //       totalExpense: newData.totalExpense,
  //       totalIncome: newData.totalIncome,
  //     });
  //   } catch (error) {
  //     console.error("Error updating transactions:", error);
  //   }
  // };

  // useEffect(() => {
  //   const id = setTimeout(() => {
  //     if (usserId) {
  //       const parentCollection = "users";
  //       const parentId = usserId;
  //       const subcollectionName = "transactions";
  //       const documentId = transId;
  //       const newData = reduxAccount;

  //       updateTransactions(
  //         parentCollection,
  //         parentId,
  //         subcollectionName,
  //         documentId,
  //         newData
  //       );
  //     }
  //   }, 2000);
  //   return () => clearTimeout(id);
  // }, [usserId, reduxAccount, transId]);

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

  // console.log(transactions);
  // console.log(reduxAccount);
  return (
    <div>
      <Header />
      <h1>{usserId}</h1>
      <Income />
      <Expense />
      <DataTable />
    </div>
  );
};

export default Dashboard;
