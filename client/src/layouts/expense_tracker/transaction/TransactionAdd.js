import React from "react";
import TransactionAddForm from "./TransactionAddForm";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import PropTypes from "prop-types";
import { Card } from "antd";
import UploadTransaction from "./UploadTransaction";

export default function TransactionAdd({
  categories,
  subCategories,
  submitTransaction,
  fetchTransactions,
}) {
  return (
    <MDBox pt={6} pb={3}>
      <Card title="Add Transaction Manually">
        <TransactionAddForm
          categories={categories}
          subCategories={subCategories}
          submitTransaction={submitTransaction}
        />
      </Card>
      <Card title="Upload Transactions">
        <UploadTransaction fetchTrasnsactions={fetchTransactions} />
      </Card>
    </MDBox>
  );
}
TransactionAdd.propTypes = {
  categories: PropTypes.array,
  subCategories: PropTypes.array,
  submitTransaction: PropTypes.func,
  fetchTransactions: PropTypes.func,
};
