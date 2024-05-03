import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addExpenseAsync, addGraphDataAsync } from "../../slices/accountSlice";
import { genRandomKey } from "../../App";
import { Modal, Button, Form } from "antd";
import ExpenseForm from "./ExpenseForm";
import { addExpense, addGraph } from "../../slices/accountSlice";

const Expense = () => {
  // const { userId, transactionId } = useContext(UserContext);
  const currUser = useSelector((state) => state.user.user);
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

    dispatch(
      addExpense({
        expenseData: expenseData,
        userId: currUser.uid,
        transId: currUser.transactionId,
      }) //passing data to redux thunk
    );

    addGraph({
      amount: -data.amount,
      createdAt: String(data.created.$d),
      userId: currUser.uid,
      transId: currUser.transactionId,
    });

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
