import React, { useState } from "react";
import { Table, Button, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import axios from "axios";
import EditTransaction from "./EditTransaction";
import { useLocation, useNavigate } from "react-router-dom";
import Unauthorized from "layouts/reusablemodals.js/Unauthorized";

const TransactionList = ({ transactions, fetchTransactions, categories, subCategories }) => {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const token = sessionStorage.getItem("access_token");

  const [unauthorized, setUnauthorized] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/authentication/sign-in", { state: { from: location } });
  };
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setEditModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/expense-tracker/delete-transaction/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Transaction deleted successfully");
      fetchTransactions();
    } catch (error) {
      message.error("Failed to delete transaction");
      if (error.status === 401) {
        navigate("/authentication/sign-in");
        sessionStorage.clear();
        window.location.reload();
      } else if (error.status == 400) {
        alert(error.response.data.error);
      }
    }
  };

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Transaction Type", dataIndex: "transaction_type", key: "transaction_type" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Sub Category", dataIndex: "subcategory", key: "subcategory" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={transactions} columns={columns} rowKey="id" />
      {editingTransaction && (
        <EditTransaction
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          transaction={editingTransaction}
          categories={categories}
          subCategories={subCategories}
          fetchTransactions={fetchTransactions}
        />
      )}
    </div>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  subCategories: PropTypes.array.isRequired,
};

export default TransactionList;
