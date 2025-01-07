import { Card, Grid } from "@mui/material";
import axios from "axios";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UploadTransaction from "./UploadTransaction";

const TransactionAddForm = () => {
  const [formData, setFormData] = useState({
    account: "",
    transaction_type: "",
    description: "",
    amount: "",
  });

  const navigate = useNavigate();
  const token = sessionStorage.getItem("access_token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    console.log(token);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/transaction/customer-transactions/",
        { ...formData }, // This is the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Transaction Added Successfully:", response.data);
      alert("Transaction Added Successfully.");
      navigate("/transactions");
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <Card>
      <MDBox pt={4} pb={3} px={3} height="100%">
        <form onSubmit={handleSubmit}>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Account Number"
              name="account"
              variant="standard"
              fullWidth
              value={formData.account}
              onChange={handleChange}
              required
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Transaction Type"
              name="transaction_type"
              variant="standard"
              fullWidth
              value={formData.transaction_type}
              onChange={handleChange}
              required
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Transaction Description"
              name="description"
              variant="standard"
              fullWidth
              value={formData.description}
              onChange={handleChange}
              required
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Amount"
              name="amount"
              variant="standard"
              fullWidth
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </MDBox>

          <MDBox mt={4} mb={1}>
            <MDButton type="submit" variant="gradient" color="info" fullWidth>
              Add Transaction
            </MDButton>
          </MDBox>
        </form>
      </MDBox>
    </Card>
  );
};

export default TransactionAddForm;
