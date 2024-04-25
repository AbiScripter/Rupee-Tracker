import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addGraph,
  addGraphDataAsync,
  addIncomeAsync,
} from "../../accountSlice";
import { genRandomKey } from "../../App";
import { UserContext } from "../../context/userContext";
import { Modal, Button } from "antd";
import IncomeForm from "./IncomeForm";
const Income = () => {
  const { userId, transactionId } = useContext(UserContext);
  const dispatch = useDispatch();
  const currAccount = useSelector((state) => state.account);
  const [openModal, setOpenModal] = useState(false);

  const handleAddIncome = async (data) => {
    const incomeData = {
      amount: Number(data.amount),
      source: data.source,
      tag: data.tag,
      createdAt: String(data.created.$d.toDateString()),
      type: "income",
      key: genRandomKey(),
    };
    await dispatch(addIncomeAsync(incomeData, userId, transactionId)); //passing data to redux thunk

    await dispatch(
      addGraphDataAsync(
        data.amount,
        String(data.created.$d),
        userId,
        transactionId
      )
    );

    setOpenModal(false);
  };

  const showModal = () => {
    setOpenModal(true);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      <h3>Income</h3>
      <h1>₹{currAccount.totalIncome}</h1>
      <Button onClick={showModal}>Add Income</Button>
      <Modal
        open={openModal}
        title="Income"
        onCancel={handleCancel}
        footer={null}
      >
        <IncomeForm handleAddIncome={handleAddIncome} />
      </Modal>
    </>
  );
};

export default Income;
