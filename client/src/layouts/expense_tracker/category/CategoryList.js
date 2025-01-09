import React, { useState } from "react";
import { Table, Button, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import axios from "axios";
import EditCategory from "./EditCategory";

const CategoryList = ({ categories, fetchCategories }) => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleEdit = (category) => {
    setEditingCategory(category);
    setEditModalVisible(true);
  };

  const columns = [
    { title: "Category Name", dataIndex: "category_name", key: "category_name" },
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
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={categories} columns={columns} rowKey="id" />
      {editingCategory && (
        <EditCategory
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          category={editingCategory}
          fetchCategories={fetchCategories}
        />
      )}
    </div>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};

export default CategoryList;
