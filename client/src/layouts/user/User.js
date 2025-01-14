import { Grid } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import UserAdd from "./UserAdd";
import Userlist from "./Userlist";
import Unauthorized from "layouts/reusablemodals.js/Unauthorized";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import UserList from "./Userlist";

export default function User() {
  const [users, setUsers] = useState([]);

  const token = sessionStorage.getItem("access_token");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const result = await axios.get("http://127.0.0.1:8000/expense-tracker/user-list/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(result.data);
    } catch (error) {
      if (error.status === 401) {
        navigate("/authentication/sign-in");
        window.location.reload();
      } else if (error.status == 400) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <UserAdd fetchUsers={fetchUsers} />
        </Grid>
        <Grid item xs={12} md={6}>
          <UserList users={users} fetchUsers={fetchUsers} />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
