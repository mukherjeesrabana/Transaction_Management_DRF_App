import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";

const { Option } = Select;

const SubCategoryAddForm = ({ categories, submitSubCategory }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    submitSubCategory(values);
  };

  const transactionTypes = [
    { name: "Expense", id: "Expense" },
    { name: "Credit", id: "Credit" },
  ];

  return (
    <Form form={form} onFinish={onFinish}>
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
        name="subcategory_name"
        label="Name"
        labelCol={{ span: 6 }}
        rules={[{ required: true }]}
      >
        <Input />
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
            Add SubCategory
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
SubCategoryAddForm.propTypes = {
  categories: PropTypes.array,
  submitSubCategory: PropTypes.func,
};

export default SubCategoryAddForm;
