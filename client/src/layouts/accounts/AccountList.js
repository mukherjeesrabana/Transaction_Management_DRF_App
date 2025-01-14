import { Button, Card, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Unauthorized from "layouts/reusablemodals.js/Unauthorized";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AccountList() {
  const token = sessionStorage.getItem("access_token");
  const [accounts, setAccounts] = useState([]);
  const [unauthorized, setUnauthorized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchAccounts();
  }, [token]);

  const fetchAccounts = () => {
    axios
      .get("http://127.0.0.1:8000/transaction/customer-accounts/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAccounts(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.status);
        if (error.status === 401) {
          setUnauthorized(true);
        }
      });
  };
  const handleLoginRedirect = () => {
    navigate("/authentication/sign-in", { state: { from: location } });
  };
  const columns = [
    {
      field: "account_number",
      headerName: "Account Number",
      width: 200,
      sortable: true,
      filterable: true,
    },
    {
      field: "account_name",
      headerName: "Account Name",
      width: 200,
      sortable: true,
      filterable: true,
    },

    {
      field: "balance",
      headerName: "Balance",
      width: 150,
      sortable: true,
      filterable: true,
    },
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Accounts Table
                </MDTypography>
                <MDTypography
                  variant="h6"
                  color="white"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/add-transaction")}
                >
                  Add Account
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataGrid
                  rows={accounts}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  //   checkboxSelection
                  disableSelectionOnClick
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
