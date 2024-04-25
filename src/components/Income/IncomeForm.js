import React from "react";
import { Form, DatePicker, Input, InputNumber, Select, Button } from "antd";

const IncomeForm = ({ handleAddIncome }) => {
  const [form] = Form.useForm();
  return (
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
          <Select.Option value="freelance">Freelance</Select.Option>
          <Select.Option value="business">Business</Select.Option>
          <Select.Option value="rental">Rental</Select.Option>
        </Select>
      </Form.Item>
      <Button type="primary" block htmlType="submit">
        Add Income
      </Button>
    </Form>
  );
};

export default IncomeForm;
