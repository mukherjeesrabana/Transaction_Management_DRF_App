import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, message } from "antd";

import PropTypes from "prop-types";

const { Option } = Select;

const CategoryAddForm = ({ submitCategory }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    submitCategory(values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name="category_name"
        label="Category Name"
        labelCol={{ span: 6 }}
        rules={[{ required: true }]}
      >
        <Input type="text" />
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
            Add Category
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
CategoryAddForm.propTypes = {
  submitCategory: PropTypes.func,
};

export default CategoryAddForm;
