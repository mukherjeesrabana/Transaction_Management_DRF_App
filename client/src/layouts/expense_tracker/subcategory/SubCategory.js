import { Grid } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import SubCategoryAddForm from "./SubCategoryAddForm";
import SubCategoryList from "./SubCategoryList";
import SubCategoryAdd from "./SubCategoryAdd";

export default function SubCategory() {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const token = sessionStorage.getItem("access_token");

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmitSubCategory = async (values) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/expense-tracker/subcategory-list/",
        { ...values }, // This is the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Subcategory added successfully");

      fetchSubCategories();
    } catch (error) {
      console.log(error);
      message.error("Failed to add subcategory");
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
    fetchSubCategories();
    fetchCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const result = await axios.get("http://127.0.0.1:8000/expense-tracker/subcategory-list/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubCategories(result.data);
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
          <SubCategoryAdd submitSubCategory={handleSubmitSubCategory} categories={categories} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SubCategoryList
            subCategories={subCategories}
            fetchSubCategories={fetchSubCategories}
            categories={categories}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
