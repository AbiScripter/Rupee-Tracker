import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, addExpenseAsync } from "../../accountSlice";
import { genRandomKey } from "../../App";
import { UserContext } from "../../context/userContext";

const Expense = () => {
  const { usserId, transId } = useContext(UserContext);
  const [expenseSource, setExpenseSource] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseTag, setExpenseTag] = useState("academic");

  const dispatch = useDispatch();
  const currAccount = useSelector((state) => state.account);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const expenseData = {
      amount: Number(expenseAmount),
      source: expenseSource,
      tag: expenseTag,
      type: "expense",
      key: genRandomKey(),
    };

    await dispatch(addExpenseAsync(expenseData, usserId, transId));
  };

  return (
    <div>
      <h3>Total Expense : {currAccount.totalExpense}</h3>
      <form onSubmit={handleAddExpense}>
        <input
          type="text"
          value={expenseSource}
          onChange={(e) => setExpenseSource(e.target.value)}
        />
        <input
          type="number"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
        <select
          value={expenseTag}
          onChange={(e) => setExpenseTag(e.target.value)}
        >
          <option value="academic">Academic</option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="others">Others</option>
        </select>
        <button>Add Expense</button>
      </form>
    </div>
  );
};

export default Expense;
