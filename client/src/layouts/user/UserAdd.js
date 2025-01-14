import { Card } from "antd";
import MDBox from "components/MDBox";
import React from "react";
import UserAddForm from "./UserAddForm";
import UserUpload from "./UserUpload";
import PropTypes from "prop-types";

export default function UserAdd({ fetchUsers }) {
  return (
    <MDBox pt={6} pb={3}>
      <Card title="Add User Manually">
        <UserAddForm fetchUsers={fetchUsers} />
      </Card>
      <Card title="Upload Users">
        <UserUpload fetchUsers={fetchUsers} />
      </Card>
    </MDBox>
  );
}
UserAdd.propTypes = {
  fetchUsers: PropTypes.func,
};
