import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MonthYearSelector from "./MonthYearSelector";
import MonthlyExpensesByCategoryChart from "./MonthlyExpensesByCategooryChart";
import MonthlyCreditsByCategoryChart from "./MonthlyCreditsByCategory";
import MonthlyOverviewChart from "./MonthlyOverviewChart";
import MonthlyCategorywiseBreakdownChart from "./MonthlyCategorywiseBreakdownChart";
import ExpenseTrackerBarChart from "./ExpenseTrackerBarChart";

export default function Reports() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const handleMonthYearChange = (selectedYear, selectedMonth) => {
    setYear(selectedYear);
    setMonth(selectedMonth);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MonthYearSelector onChange={handleMonthYearChange} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <MonthlyExpensesByCategoryChart year={year} month={month} />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <MonthlyCreditsByCategoryChart year={year} month={month} />
            </MDBox>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <MonthlyOverviewChart year={year} month={month} />
            </MDBox>
          </Grid> */}
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <MonthlyCategorywiseBreakdownChart year={year} month={month} />
            </MDBox>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ExpenseTrackerBarChart year={year} month={month} />
            </MDBox>
          </Grid> */}
          {/* Other charts */}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
