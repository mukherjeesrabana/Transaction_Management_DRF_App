import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import TransactionAddForm from "./TransactionAddForm";
import UploadTransaction from "./UploadTransaction";

export default function TransactionAdd() {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={4} pb={3} px={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <TransactionAddForm />
          </Grid>
          <Grid item xs={12}>
            OR
          </Grid>
          <Grid item xs={12}>
            <UploadTransaction />
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
