import React from "react";
import { Button } from "antd";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { reset } from "../slices/userSlice";

import Header from "../components/Header";
import Expense from "../components/Expense";
import Income from "../components/Income";
import DataTable from "../components/Tables";
import LineGraph from "../components/Charts/LineGraph";
import PieChart from "../components/Charts/PieChart";
import NoTransactions from "../components/NoTransactions";
import "./Dashboard.css";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
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
  //!  method using onsnapshot(real time data fetching)
  // useEffect(() => {
  //   const userId = user?.uid;

  //   if (!userId) {
  //     console.warn("No user ID available to fetch data.");
  //     return;
  //   }

  //   //user's data collection
  //   const userCollectionRef = collection(db, `users/${userId}/transactions`);

  //   const unsubscribe = onSnapshot(
  //     userCollectionRef,
  //     (querySnapshot) => {
  //       const userData = [];
  //       querySnapshot.forEach((doc) => {
  //         userData.push({ id: doc.id, ...doc.data() });
  //       });
  //       //we are getting data from collection so that will be an array, so getting the first index will be the user data
  //       // dispatch actions with the first item
  //       const firstUserData = userData[0];
  //       // console.log(firstUserData);
  //       if (firstUserData) {
  //         dispatch(initiateUserData(firstUserData));
  //         dispatch(
  //           initiateUser({ ...user, transactionId: firstUserData.id })
  //         );
  //       }
  //     },
  //     (error) => {
  //       console.error("Error fetching transactions:", error);
  //     }
  //   );

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [user?.uid, dispatch]);

  return (
    <div className="app-container">
      <Header />
      <Button className="sign-out-btn" onClick={handleSignOut}>
        SignOut
      </Button>
      {user && <h2 className="hello-user">{`Hello ${user?.name} 👋`}</h2>}

      <div className="content-container">
        <BalanceContainer user={user} />
        <DataVisualization user={user} />
      </div>
    </div>
  );
};

const BalanceContainer = ({ user }) => {
  return (
    <div className="balance-container">
      <div className="card card-balance">
        <h3>Balance</h3>
        <h1>₹{user.currBalance}</h1>
      </div>
      <div className="card">
        <Income />
      </div>
      <div className="card">
        <Expense />
      </div>
    </div>
  );
};

const DataVisualization = ({ user }) => {
  return (
    <div>
      {user.expenses.length === 0 && user.incomes.length === 0 ? (
        <NoTransactions />
      ) : (
        <div className="main-section">
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
    </div>
  );
};

export default Dashboard;

//another methods to fetch users data from firebaes[alternatives]
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
