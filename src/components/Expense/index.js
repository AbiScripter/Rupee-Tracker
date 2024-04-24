import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  addExpenseAsync,
  addGraph,
  addGraphDataAsync,
} from "../../accountSlice";
import { genRandomKey } from "../../App";
import { UserContext } from "../../context/userContext";
import { Form, DatePicker, Input, InputNumber, Select, Button } from "antd";

const Expense = () => {
  const [form] = Form.useForm();
  const { userId, transactionId } = useContext(UserContext);
  const dispatch = useDispatch();
  const currAccount = useSelector((state) => state.account);

  const handleAddExpense = async (data) => {
    // console.log(data);
    const expenseData = {
      amount: Number(data.amount),
      source: data.source,
      tag: data.tag,
      createdAt: String(data.created.$d),
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
  };

  return (
    <div>
      <h3>Total Expense : {currAccount.totalExpense}</h3>

      <Form onFinish={handleAddExpense} form={form} variant="filled">
        <Form.Item
          label="source"
          name="source"
          rules={[
            { required: true, message: "Please input your source of expense!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="amount"
          name="amount"
          rules={[{ required: true, message: "Please input amount!" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="created"
          name="created"
          rules={[{ required: true, message: "Please enter date!" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="tag"
          name="tag"
          rules={[{ required: true, message: "Please enter tag!" }]}
        >
          <Select>
            <Select.Option value="academic">Academic</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="others">other</Select.Option>
          </Select>
        </Form.Item>
        <Button type="primary" block htmlType="submit">
          Add Expense
        </Button>
      </Form>
    </div>
  );
};

export default Expense;
