import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addGraph,
  addGraphDataAsync,
  addIncomeAsync,
} from "../../accountSlice";
import { genRandomKey } from "../../App";
import { UserContext } from "../../context/userContext";
import { Form, DatePicker, Input, InputNumber, Select, Button } from "antd";
const Income = () => {
  const [form] = Form.useForm();
  const { userId, transactionId } = useContext(UserContext);
  const [incomeSource, setIncomeSource] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeTag, setIncomeTag] = useState("salary");
  const dispatch = useDispatch();
  const currAccount = useSelector((state) => state.account);

  const handleAddIncome = async (data) => {
    const incomeData = {
      amount: Number(data.amount),
      source: data.source,
      tag: data.tag,
      createdAt: String(data.created.$d),
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
  };

  return (
    <div>
      <h3>Total Income : {currAccount.totalIncome}</h3>
      <Form onFinish={handleAddIncome} form={form} variant="filled">
        <Form.Item
          label="source"
          name="source"
          rules={[
            { required: true, message: "Please input your source of income!" },
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
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
            <Select.Option value="others">Others</Select.Option>
          </Select>
        </Form.Item>
        <Button type="primary" block htmlType="submit">
          Add Income
        </Button>
      </Form>
    </div>
  );
};

export default Income;
