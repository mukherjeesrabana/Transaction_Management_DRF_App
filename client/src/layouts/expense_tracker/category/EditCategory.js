import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message } from "antd";
import axios from "axios";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import Unauthorized from "layouts/reusablemodals.js/Unauthorized";

const EditCategory = ({ visible, onClose, category, fetchCategories }) => {
  const [form] = Form.useForm();
  const token = sessionStorage.getItem("access_token");

  const [unauthorized, setUnauthorized] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/authentication/sign-in", { state: { from: location } });
  };

  useEffect(() => {
    if (category) {
      form.setFieldsValue(category);
    }
  }, [category, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(
        `http://127.0.0.1:8000/expense-tracker/edit-category/${category.id}/`,
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Category updated successfully");
      fetchCategories();
      onClose();
    } catch (error) {
      message.error("Failed to update category");
      if (error.status === 401) {
        setUnauthorized(true);
      } else if (error.status == 400) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <Modal title="Edit Category" visible={visible} onOk={handleOk} onCancel={onClose}>
      {unauthorized && (
        <Unauthorized
          openstate={unauthorized}
          content="Please login to continue"
          onLogin={handleLoginRedirect}
        />
      )}
      <Form form={form} layout="vertical">
        <Form.Item name="category_name" label="Category Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditCategory.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  category: PropTypes.object,
  fetchCategories: PropTypes.func.isRequired,
};

export default EditCategory;
