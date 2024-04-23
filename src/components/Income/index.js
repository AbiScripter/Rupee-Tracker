import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIncome, addIncomeAsync } from "../../accountSlice";
import { genRandomKey } from "../../App";
import UpdateTrans from "../../utils/updateTransactions";
import { UserContext } from "../../context/userContext";

const Income = () => {
  const { usserId, transId } = useContext(UserContext);

  const [incomeSource, setIncomeSource] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeTag, setIncomeTag] = useState("salary");
  const dispatch = useDispatch();
  const currAccount = useSelector((state) => state.account);

  const handleAddIncome = async (e) => {
    e.preventDefault();
    const incomeData = {
      amount: Number(incomeAmount),
      source: incomeSource,
      tag: incomeTag,
      type: "income",
      key: genRandomKey(),
    };
    await dispatch(addIncomeAsync(incomeData, usserId, transId)); //passing data to redux thunk
  };

  return (
    <div>
      <h3>Total Income : {currAccount.totalIncome}</h3>
      <form onSubmit={handleAddIncome}>
        <input
          type="text"
          value={incomeSource}
          onChange={(e) => setIncomeSource(e.target.value)}
        />
        <input
          type="number"
          value={incomeAmount}
          onChange={(e) => setIncomeAmount(e.target.value)}
        />
        <select
          value={incomeTag}
          onChange={(e) => setIncomeTag(e.target.value)}
        >
          <option value="salary">Salary</option>
          <option value="investment">Investment</option>
          <option value="others">Others</option>
        </select>
        <button>Add Income</button>
      </form>
    </div>
  );
};

export default Income;
