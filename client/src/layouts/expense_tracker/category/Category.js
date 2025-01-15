import { Grid } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";
import CategoryList from "./CategoryList";
import CategoryAdd from "./CategoryAdd";
import { useLocation, useNavigate } from "react-router-dom";
import Unauthorized from "layouts/reusablemodals.js/Unauthorized";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const token = sessionStorage.getItem("access_token");
  const [unauthorized, setUnauthorized] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/authentication/sign-in", { state: { from: location } });
  };

  const handleSubmitCategory = async (values) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/expense-tracker/category-list/",
        { ...values }, // This is the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Category added successfully");

      fetchCategories();
    } catch (error) {
      console.log(error);
      message.error("Failed to add category");
      if (error.status === 401) {
        navigate("/authentication/sign-in");
        sessionStorage.clear();
        window.location.reload();
      } else if (error.status == 400) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
        sessionStorage.clear();
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
          <CategoryAdd submitCategory={handleSubmitCategory} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CategoryList categories={categories} fetchCategories={fetchCategories} />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
