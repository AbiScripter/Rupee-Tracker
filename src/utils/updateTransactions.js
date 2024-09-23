import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const updateTransactions = async (updatedUserState) => {
  try {
    const docRef = doc(db, "users", updatedUserState.uid);
    await updateDoc(docRef, updatedUserState);
  } catch (error) {
    console.error("Error updating transactions:", error);
  }
};

export default updateTransactions;
