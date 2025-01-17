import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import UserRegistrationTrend from "./UserRegistrationTrend";
import UserStatistics from "./UserStatistics";
import UserRoleDistribution from "./UserRoleDistribution";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <UserRegistrationTrend />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <UserRoleDistribution />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <MDBox mb={3}>
              <UserStatistics />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <MDBox mb={3}>
              <UserRoleDistribution />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
