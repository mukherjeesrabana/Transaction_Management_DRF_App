import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, message } from "antd";
import axios from "axios";
import PropTypes from "prop-types";
import moment from "moment";
import dayjs from "dayjs";
import Unauthorized from "layouts/reusablemodals.js/Unauthorized";
import { useLocation, useNavigate } from "react-router-dom";

const { Option } = Select;

const EditTransaction = ({ visible, onClose, transaction, categories, fetchTransactions }) => {
  const [subCategories, setSubCategories] = useState([]);
  const token = sessionStorage.getItem("access_token");

  const [form] = Form.useForm();

  const [unauthorized, setUnauthorized] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/authentication/sign-in", { state: { from: location } });
  };

  useEffect(() => {
    if (transaction) {
      form.setFieldsValue({
        ...transaction,
        date: dayjs(transaction.date),
        category: transaction.category_id,
        subcategory: transaction.subcategory_id,
      });
    }
  }, [transaction, form]);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/expense-tracker/subcategory-list-by-category/${transaction.category_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setSubCategories(response.data);
      })
      .catch((error) => {
        if (error.status === 401) {
          navigate("/authentication/sign-in");
          sessionStorage.clear();
          window.location.reload();
        } else if (error.status == 400) {
          alert(error.response.data.error);
        }
      });
  }, [transaction]);

  const handleOk = async () => {
    try {
      const values = await form.getFieldsValue();
      console.log(values);
      await axios.put(
        `http://127.0.0.1:8000/expense-tracker/edit-transaction/${transaction.id}/`,
        {
          ...values,
          date: values.date.format("YYYY-MM-DD"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Transaction updated successfully");
      fetchTransactions();
      onClose();
    } catch (error) {
      message.error("Failed to update transaction");
      if (error.status === 401) {
        navigate("/authentication/sign-in");
        sessionStorage.clear();
        window.location.reload();
      } else if (error.status == 400) {
        alert(error.response.data.error);
      }
    }
  };
  const onCategoryChange = (value) => {
    console.log(value);
    axios
      .get(`http://127.0.0.1:8000/expense-tracker/subcategory-list-by-category/${value}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setSubCategories(response.data);
      })
      .catch((error) => {
        if (error.status === 401) {
          navigate("/authentication/sign-in");
          sessionStorage.clear();
          window.location.reload();
        } else if (error.status == 400) {
          alert(error.response.data.error);
        }
      });
  };
  return (
    <Modal title="Edit Transaction" visible={visible} onOk={handleOk} onCancel={onClose}>
      <Form form={form} layout="vertical">
        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item name="transaction_type" label="Transaction Type" rules={[{ required: true }]}>
          <Select>
            <Option value="Expense">Expense</Option>
            <Option value="Credit">Credit</Option>
          </Select>
        </Form.Item>
        <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Select onChange={onCategoryChange}>
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.category_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="subcategory" label="Sub Category" rules={[{ required: true }]}>
          <Select>
            {subCategories.map((s) => (
              <Option key={s.id} value={s.id}>
                {s.subcategory_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditTransaction.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  transaction: PropTypes.object,
  categories: PropTypes.array.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
};

export default EditTransaction;
