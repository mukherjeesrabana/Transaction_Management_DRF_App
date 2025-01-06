import axios from "axios";
import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
import Button from "assets/theme/components/button";

export default function TransactionList() {
  const token = sessionStorage.getItem("access_token");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/transaction/customer-transactions/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTransactions(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const columns = [
    {
      name: "date",
      headerName: "Transaction Date",
      width: 200,
      sortable: true,
      filterable: true,
      align: "center",
    },
    {
      name: "account",
      headerName: "Account",
      width: 200,
      sortable: true,
      filterable: true,
      align: "center",
    },
    {
      name: "description",
      headerName: "Transaction Details",
      width: 200,
      sortable: true,
      filterable: true,
      align: "center",
    },
    {
      name: "transaction_type",
      headerName: "Transaction Type",
      width: 200,
      sortable: true,
      filterable: true,
      align: "center",
    },
    {
      name: "amount",
      headerName: "Amount",
      width: 150,
      sortable: true,
      filterable: true,
      align: "center",
    },
    {
      name: "available_balance",
      headerName: "Available Balance",
      width: 150,
      sortable: true,
      filterable: true,
      align: "center",
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
                Transactions table
              </VuiTypography>
            </VuiBox>
            <VuiBox
              sx={{
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={transactions} />
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}
