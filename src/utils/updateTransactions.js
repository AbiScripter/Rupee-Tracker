import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { UserContext } from "../context/userContext";
import { useContext, useEffect } from "react";

const UpdateTrans = (usserId, transId) => {
  const updateTransactions = async (updatedState) => {
    try {
      const docRef = doc(db, `users/${usserId}/transactions`, transId);
      const transactionData = {
        currBalance: updatedState.currBalance,
        incomes: updatedState.incomes,
        expenses: updatedState.expenses,
        totalIncome: updatedState.totalIncome,
        totalExpense: updatedState.totalExpense,
        graphData: updatedState.graphData,
      };
      await updateDoc(docRef, transactionData);
    } catch (error) {
      console.error("Error updating transactions:", error);
    }
  };

  return { updateTransactions };
};

export default UpdateTrans;
