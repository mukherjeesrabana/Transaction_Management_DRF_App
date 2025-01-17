/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useEffect, useState } from "react";
import axios from "axios";
import Unauthorized from "layouts/reusablemodals.js/Unauthorized";
import MonthYearSelector from "layouts/expense_tracker/reports/MonthYearSelector";
import { useLocation, useNavigate } from "react-router-dom";
import getCategoryWiseexpenseData from "./data/categorywiseexpensedata";
import getCategoryWisecreditData from "./data/categorywisecredits";
import DailyExpenseTrackerChart from "layouts/reports/DailyExpenseTrackerChart";
import MonthlyCategorywiseBreakdownChart from "layouts/expense_tracker/reports/MonthlyCategorywiseBreakdownChart";
import { Card } from "antd";
import ExpenseTrackerBarChart from "layouts/expense_tracker/reports/ExpenseTrackerBarChart";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const token = sessionStorage.getItem("access_token");
  const [data, setData] = useState({});
  const [categoryWiseExpenseData, setCategoryWiseExpenseData] = useState({});
  const [categoryWiseCreditData, setCategoryWiseCreditData] = useState({});

  const [unauthorized, setUnauthorized] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/authentication/sign-in", { state: { from: location } });
  };

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const handleMonthYearChange = (selectedYear, selectedMonth) => {
    setYear(selectedYear);
    setMonth(selectedMonth);
  };

  const fetchMonthlyOverview = () => {
    axios
      .get(`http://127.0.0.1:8000/expense-tracker/monthly-overall-overview/${year}/${month}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((e) => {
        if (e.response && e.response.status === 401) {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    fetchMonthlyOverview();
    fetchCategoryWiseExpenseData();
    fetchCategoryWiseCreditData();
  }, [token, year, month]);
  const fetchCategoryWiseExpenseData = async () => {
    const data = await getCategoryWiseexpenseData(year, month, token, setUnauthorized);

    if (data && data.status) {
      if (data.status === 401) {
        navigate("/authentication/sign-in");
        window.location.reload();
      } else if (data.status === 400) {
        alert(data.message);
      }
    } else {
      setCategoryWiseExpenseData(data);
    }
  };
  const fetchCategoryWiseCreditData = async () => {
    const data = await getCategoryWisecreditData(year, month, token, setUnauthorized);
    if (data && data.status) {
      if (data.status === 401) {
        navigate("/authentication/sign-in");
        window.location.reload();
      } else if (data.status === 400) {
        alert(data.message);
      }
    } else {
      setCategoryWiseCreditData(data);
    }
  };

  const valueFormatter = (value) => {
    return `INR ${value}`;
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3} mb={3}>
        <MonthYearSelector onChange={handleMonthYearChange} />
      </MDBox>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="weekend"
                title="Monthly Credits"
                count={valueFormatter(data.total_credits)}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="leaderboard"
                title="Monthly Expenses"
                count={valueFormatter(data.total_expenses)}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="store"
                title="Monthly Available Balance"
                count={valueFormatter(data.available_balance)}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="monthly expenses"
                  description="monthly expenditure categorywise"
                  // date="campaign sent 2 days ago"
                  chart={categoryWiseExpenseData}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="monthly credits"
                  description="income sources of the month"
                  // date="updated 4 min ago"
                  chart={categoryWiseCreditData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={6}>
            {/* <Grid item xs={12} md={6} lg={8}>
              <Projects month={month} year={year} />
            </Grid> */}
            <Grid item xs={12} md={10} lg={10}>
              <MDBox mb={3}>
                <Card title="Monthly Overview">
                  <ExpenseTrackerBarChart year={year} month={month} />
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
