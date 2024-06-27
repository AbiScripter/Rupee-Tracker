import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const updateTransactions = async (updatedState, userId, transId) => {
  try {
    console.log(updatedState);
    console.log(userId);

    const docRef = doc(db, `users/${userId}/transactions`, transId);
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

export default updateTransactions;
