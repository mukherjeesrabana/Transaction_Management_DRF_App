import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, message } from "antd";
import axios from "axios";
import PropTypes from "prop-types";
import Unauthorized from "layouts/reusablemodals.js/Unauthorized";
import { useLocation, useNavigate } from "react-router-dom";

const { Option } = Select;

const EditUser = ({ visible, onClose, user, fetchUsers }) => {
  const token = sessionStorage.getItem("access_token");

  const [form] = Form.useForm();

  const [unauthorized, setUnauthorized] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/authentication/sign-in", { state: { from: location } });
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
      });
    }
  }, [user, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(
        `http://127.0.0.1:8000/expense-tracker/edit-user/${user.email}/`,
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("User updated successfully");
      fetchUsers();
      onClose();
    } catch (error) {
      message.error("Failed to update user");
      if (error.status === 401) {
        navigate("/authentication/sign-in");
        window.location.reload();
      } else if (error.status == 400) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <Modal title="Edit User" visible={visible} onOk={handleOk} onCancel={onClose}>
      <Form form={form} layout="vertical">
        <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input type="text" disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditUser.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  fetchUsers: PropTypes.func.isRequired,
};

export default EditUser;
