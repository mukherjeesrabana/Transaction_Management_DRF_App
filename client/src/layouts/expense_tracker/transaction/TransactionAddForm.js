import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";

const { Option } = Select;

const TransactionAddForm = ({ categories, submitTransaction }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    submitTransaction(values);
  };

  const transactionTypes = [
    { name: "Expense", id: "Expense" },
    { name: "Credit", id: "Credit" },
  ];

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="date" label="Date" labelCol={{ span: 6 }} rules={[{ required: true }]}>
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item name="amount" label="Amount" labelCol={{ span: 6 }} rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="category"
        label="Category"
        labelCol={{ span: 6 }}
        rules={[{ required: true }]}
      >
        <Select>
          {categories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.category_name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="transaction_type"
        label="Transaction Type"
        labelCol={{ span: 6 }}
        rules={[{ required: true }]}
      >
        <Select>
          {transactionTypes.map((t) => (
            <Option key={t.id} value={t.id}>
              {t.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        labelCol={{ span: 6 }}
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>

      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: "3%" }}>
            Add Transaction
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            color="secondary"
            sx={{ width: "8rem" }}
            variant="outlined"
            onClick={() => {
              form.resetFields();
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
TransactionAddForm.propTypes = {
  categories: PropTypes.array,
  submitTransaction: PropTypes.func,
};

export default TransactionAddForm;
