import React, { useState } from "react";
import { Table, Button, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import EditSubCategory from "./EditSubCategory";

const SubCategoryList = ({ subCategories, fetchSubCategories, categories }) => {
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleEdit = (subcategory) => {
    setEditingSubCategory(subcategory);
    setEditModalVisible(true);
  };

  const columns = [
    { title: "Name", dataIndex: "subcategory_name", key: "subcategory_name" },
    { title: "Category", dataIndex: "category", key: "category" },
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
      <Table dataSource={subCategories} columns={columns} rowKey="id" />
      {editingSubCategory && (
        <EditSubCategory
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          subcategory={editingSubCategory}
          fetchSubCategories={fetchSubCategories}
          categories={categories}
        />
      )}
    </div>
  );
};

SubCategoryList.propTypes = {
  subCategories: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  fetchSubCategories: PropTypes.func.isRequired,
};

export default SubCategoryList;
