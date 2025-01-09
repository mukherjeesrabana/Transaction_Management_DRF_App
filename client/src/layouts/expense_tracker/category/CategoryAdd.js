import React from "react";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import PropTypes from "prop-types";
import { Card } from "antd";

import CategoryAddForm from "./CategoryAddForm";

export default function CategoryAdd({ submitCategory }) {
  return (
    <MDBox pt={6} pb={3}>
      <Card title="Add Category Manually">
        <CategoryAddForm submitCategory={submitCategory} />
      </Card>
    </MDBox>
  );
}
CategoryAdd.propTypes = {
  submitCategory: PropTypes.func,
};
