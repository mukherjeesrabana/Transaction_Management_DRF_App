import React, { useState } from "react";
import { Table, Button, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Unauthorized from "layouts/reusablemodals.js/Unauthorized";
import EditUser from "./EditUser";

const UserList = ({ users, fetchUsers }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const token = sessionStorage.getItem("access_token");

  const location = useLocation();
  const navigate = useNavigate();

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditModalVisible(true);
  };

  const handleChangeStatus = async (email) => {
    try {
      await axios.put(`http://127.0.0.1:8000/expense-tracker/change-user-status/${email}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("User status changed successfully");
      fetchUsers();
    } catch (error) {
      message.error("Failed to change status");
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
    { title: "First Name", dataIndex: "first_name", key: "first_name" },
    { title: "Last Name", dataIndex: "last_name", key: "last_name" },
    { title: "Email Address", dataIndex: "email", key: "email" },

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
          {/* <Button type="danger" onClick={() => handleChangeStatus(record.email)}>
            {record.status === "Active" ? <p>Deactivate User</p> : <p>Activate User</p>}
          </Button> */}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={users} columns={columns} rowKey="email" />
      {editingUser && (
        <EditUser
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          user={editingUser}
          fetchUsers={fetchUsers}
        />
      )}
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

export default UserList;
