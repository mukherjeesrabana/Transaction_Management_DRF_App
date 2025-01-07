import { Grid, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import TransactionSummaryChart from "./TransactionSummaryChart";
import axios from "axios";
import Unauthorized from "layouts/reusablemodals.js/Unauthorized";
import { useLocation, useNavigate } from "react-router-dom";
import IncomeVsExpensesChart from "./IncomeExpenseChart";
import DescriptionWiseExpenseBreakdown from "./DescriptionWiseExpenseBreakdown";

export default function Reports() {
  const [transactionSummaryData, setTransactionSummaryData] = useState([]);
  const [incomeExpenseData, setIncomeExpenseData] = useState([]);
  const [descriptionWiseExpense, setDescriptionWiseBreakdown] = useState([]);
  const [unauthorized, setUnauthorized] = useState(false);
  const token = sessionStorage.getItem("access_token");
  const navigate = useNavigate();
  const location = useLocation();
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
  const fetchIncomeExpenseData = () => {
    axios
      .get("http://127.0.0.1:8000/transaction/income-vs-expenses/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        setIncomeExpenseData(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.status);
        if (error.status === 401) {
          setUnauthorized(true);
        }
      });
  };

  const fetchDescriptionWiseExpenseBreakdown = () => {
    axios
      .get("http://127.0.0.1:8000/transaction/description-wise-expense-breakdown/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        setDescriptionWiseBreakdown(res.data);
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
    fetchIncomeExpenseData();
    fetchDescriptionWiseExpenseBreakdown();
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
              <IncomeVsExpensesChart data={incomeExpenseData} />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <DescriptionWiseExpenseBreakdown data={descriptionWiseExpense} />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
