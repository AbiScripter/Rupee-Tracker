import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpenseAsync, addGraphDataAsync } from "../../accountSlice";
import { genRandomKey } from "../../App";
import { UserContext } from "../../context/userContext";
import { Modal, Button, Form } from "antd";
import ExpenseForm from "./ExpenseForm";

const Expense = () => {
  const { userId, transactionId } = useContext(UserContext);
  const dispatch = useDispatch();
  const currAccount = useSelector((state) => state.account);
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();

  const handleAddExpense = async (data) => {
    // console.log(data);
    const expenseData = {
      amount: Number(data.amount),
      source: data.source,
      tag: data.tag,
      createdAt: String(data.created.$d.toDateString()),
      type: "expense",
      key: genRandomKey(),
    };

    await dispatch(addExpenseAsync(expenseData, userId, transactionId));
    await dispatch(
      addGraphDataAsync(
        -data.amount,
        String(data.created.$d),
        userId,
        transactionId
      )
    );
    setOpenModal(false);
    form.resetFields();
  };

  const showModal = () => {
    setOpenModal(true);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      <h3>Expenses</h3>
      <h1>₹{currAccount.totalExpense}</h1>
      <Button onClick={showModal}>Add Expense</Button>
      <Modal
        open={openModal}
        title="Expense"
        onCancel={handleCancel}
        footer={null}
      >
        <ExpenseForm handleAddExpense={handleAddExpense} form={form} />
      </Modal>
    </>
  );
};

export default Expense;
