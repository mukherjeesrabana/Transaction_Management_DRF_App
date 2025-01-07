import { Button, Card, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TransactionList() {
  const token = sessionStorage.getItem("access_token");
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchTransactions();
  }, [token]);

  const fetchTransactions = () => {
    axios
      .get("http://127.0.0.1:8000/transaction/customer-transactions/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        res.data.map((transaction) => {
          transaction.date = transaction.date.split("T")[0];
        });
        setTransactions(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const columns = [
    {
      field: "date",
      headerName: "Transaction Date",
      width: 200,
      sortable: true,
      filterable: true,
    },
    {
      field: "account",
      headerName: "Account",
      width: 200,
      sortable: true,
      filterable: true,
    },
    {
      field: "description",
      headerName: "Transaction Details",
      width: 200,
      sortable: true,
      filterable: true,
    },
    {
      field: "transaction_type",
      headerName: "Transaction Type",
      width: 200,
      sortable: true,
      filterable: true,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      sortable: true,
      filterable: true,
    },
    {
      field: "available_balance",
      headerName: "Available Balance",
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
                  Transactions Table
                </MDTypography>
                <MDTypography
                  variant="h6"
                  color="white"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/add-transaction")}
                >
                  Add Transaction
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataGrid
                  rows={transactions}
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
