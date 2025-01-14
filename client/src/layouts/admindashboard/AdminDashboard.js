import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      Admin dashboard
    </DashboardLayout>
  );
}
