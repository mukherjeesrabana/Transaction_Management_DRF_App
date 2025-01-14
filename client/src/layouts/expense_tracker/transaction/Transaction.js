import { Grid } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import TransactionList from "./TransactionList";
import TransactionAdd from "./TransactionAdd";
import { message } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Unauthorized from "layouts/reusablemodals.js/Unauthorized";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const token = sessionStorage.getItem("access_token");

  const [unauthorized, setUnauthorized] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/authentication/sign-in", { state: { from: location } });
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  const handleSubmitTransaction = async (values) => {
    try {
      const formattedValues = {
        ...values,
        date: values.date.format("YYYY-MM-DD"),
      };
      // console.log(formattedValues);
      await axios.post(
        "http://127.0.0.1:8000/expense-tracker/transaction-list/",
        { ...formattedValues }, // This is the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Transaction added successfully");

      fetchTransactions();
    } catch (error) {
      console.log(error);
      message.error("Failed to add transaction");
      if (error.status === 401) {
        navigate("/authentication/sign-in");
        window.location.reload();
      } else if (error.status == 400) {
        alert(error.response.data.error);
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await axios.get("http://127.0.0.1:8000/expense-tracker/category-list/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(result.data);
    } catch (error) {
      if (error.status === 401) {
        navigate("/authentication/sign-in");
        window.location.reload();
      } else if (error.status == 400) {
        alert(error.response.data.error);
      }
    }
  };

  const fetchTransactions = async () => {
    try {
      const result = await axios.get("http://127.0.0.1:8000/expense-tracker/transaction-list/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(result.data);
      console.log("fetched");
    } catch (error) {
      if (error.status === 401) {
        navigate("/authentication/sign-in");
        window.location.reload();
      } else if (error.status == 400) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TransactionAdd
            categories={categories}
            submitTransaction={handleSubmitTransaction}
            fetchTransactions={fetchTransactions}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TransactionList
            categories={categories}
            transactions={transactions}
            fetchTransactions={fetchTransactions}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
