import { Card } from "antd";
import MDBox from "components/MDBox";
import React from "react";
import SubCategoryAddForm from "./SubCategoryAddForm";
import PropTypes from "prop-types";

export default function SubCategoryAdd({ categories, submitSubCategory }) {
  return (
    <MDBox pt={6} pb={3}>
      <Card title="Add Transaction Manually">
        <SubCategoryAddForm categories={categories} submitSubCategory={submitSubCategory} />
      </Card>
      {/* <Card title="Upload Transactions">
            <UploadTransaction fetchTrasnsactions={fetchTransactions} />
          </Card> */}
    </MDBox>
  );
}
SubCategoryAdd.propTypes = {
  categories: PropTypes.array,
  submitSubCategory: PropTypes.func,
};
