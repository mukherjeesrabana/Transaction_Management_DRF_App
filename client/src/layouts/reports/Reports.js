import { Grid, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import TransactionSummaryChart from "./TransactionSummaryChart";
import MonthlyTransactionChart from "./MonthlyTransactionChart";
import AccountBalanceChart from "./AccountBalanceChart";
import axios from "axios";
import Unauthorized from "layouts/reusablemodals.js/Unauthorized";
import { useNavigate } from "react-router-dom";

export default function Reports() {
  const [transactionSummaryData, setTransactionSummaryData] = useState([]);
  const [accountBalanceData, setAccountBalanceData] = useState([]);
  const [monthlyTransactionData, setMonthlyTransactionData] = useState([]);
  const [unauthorized, setUnauthorized] = useState(false);
  const token = sessionStorage.getItem("access_token");
  const navigate = useNavigate();
  const fetchTransactionSummaryData = () => {
    axios
      .get("http://127.0.0.1:8000/transaction/transaction-summary/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        setTransactionSummaryData(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.status);
        if (error.status === 401) {
          setUnauthorized(true);
        }
      });
  };
  const fetchAccountBalanceData = () => {
    axios
      .get("http://127.0.0.1:8000/transaction/account-balance/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        setAccountBalanceData(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.status);
        if (error.status === 401) {
          setUnauthorized(true);
        }
      });
  };
  const fetchMonthlyTransactionData = () => {
    axios
      .get("http://127.0.0.1:8000/transaction/monthly-transactions/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        setMonthlyTransactionData(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.status);
        if (error.status === 401) {
          setUnauthorized(true);
        }
      });
  };
  useEffect(() => {
    fetchTransactionSummaryData();
    fetchAccountBalanceData();
    fetchMonthlyTransactionData();
  }, [token]);
  const handleLoginRedirect = () => {
    navigate("/authentication/sign-in", { state: { from: location } });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {unauthorized && (
        <Unauthorized
          openstate={unauthorized}
          content="You are not authorized to view this page. Please login to view this page."
          onLogin={handleLoginRedirect}
        />
      )}

      <MDBox p={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <TransactionSummaryChart data={transactionSummaryData} />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <AccountBalanceChart data={accountBalanceData} />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <MonthlyTransactionChart data={monthlyTransactionData} />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
