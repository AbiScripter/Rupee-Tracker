import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGraph, addIncome } from "../../slices/userSlice";
import { genRandomKey } from "../../App";
import { Modal, Button } from "antd";
import IncomeForm from "./IncomeForm";
import { Form } from "antd";

const Income = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();

  const handleAddIncome = (data) => {
    const incomeData = {
      amount: Number(data.amount),
      source: data.source,
      tag: data.tag,
      createdAt: String(data.created.$d.toDateString()),
      type: "income",
      key: genRandomKey(),
    };

    dispatch(addIncome(incomeData));

    dispatch(
      addGraph({
        amount: data.amount,
        createdAt: String(data.created.$d),
      })
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
      <h3>Income</h3>
      <h1>₹{user.totalIncome}</h1>
      <Button onClick={showModal}>Add Income</Button>
      <Modal
        open={openModal}
        title="Income"
        onCancel={handleCancel}
        footer={null}
      >
        <IncomeForm handleAddIncome={handleAddIncome} form={form} />
      </Modal>
    </>
  );
};

export default Income;
