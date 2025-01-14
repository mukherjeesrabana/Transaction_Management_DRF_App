import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const UserAddForm = ({ fetchUsers }) => {
  const [form] = Form.useForm();
  const token = sessionStorage.getItem("access_token");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);

    try {
      // console.log(formattedValues);
      await axios.post(
        "http://127.0.0.1:8000/expense-tracker/user-list/",
        { ...values }, // This is the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("User added successfully");

      fetchUsers();
    } catch (error) {
      console.log(error);
      message.error("Failed to add user");
      if (error.status === 401) {
        navigate("authentication/sign-in");
        window.location.reload();
      } else if (error.status == 400) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
        <Input type="text" />
      </Form.Item>
      <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]}>
        <Input type="text" />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input type="text" />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
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
            Add User
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
UserAddForm.propTypes = {
  fetchUsers: PropTypes.func,
};

export default UserAddForm;
