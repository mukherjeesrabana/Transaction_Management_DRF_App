import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message, Select } from "antd";
import axios from "axios";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import Unauthorized from "layouts/reusablemodals.js/Unauthorized";

const EditSubCategory = ({ visible, onClose, subcategory, fetchSubCategories, categories }) => {
  console.log(categories);
  const [form] = Form.useForm();
  const token = sessionStorage.getItem("access_token");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (subcategory) {
      console.log(subcategory);
      form.setFieldsValue({
        ...subcategory,

        category: subcategory.category_id,
      });
    }
  }, [subcategory, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(
        `http://127.0.0.1:8000/expense-tracker/edit-subcategory/${subcategory.id}/`,
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Sub Category updated successfully");
      fetchSubCategories();
      onClose();
    } catch (error) {
      message.error("Failed to update sub category");
      if (error.status === 401) {
        navigate("/authentication/sign-in");
        sessionStorage.clear();
        window.location.reload();
      } else if (error.status == 400) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <Modal title="Edit Sub Category" visible={visible} onOk={handleOk} onCancel={onClose}>
      <Form form={form} layout="vertical">
        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Select>
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.category_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="subcategory_name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditSubCategory.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  subcategory: PropTypes.object,
  fetchSubCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default EditSubCategory;
