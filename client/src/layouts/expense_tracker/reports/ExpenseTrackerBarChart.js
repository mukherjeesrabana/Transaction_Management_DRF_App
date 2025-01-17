import { BarChart } from "@mui/x-charts";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { Card } from "antd";
import axios from "axios";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";

export default function ExpenseTrackerBarChart({ year, month }) {
  const [data, setData] = useState([]);
  const [noData, setNoData] = useState("");
  const token = sessionStorage.getItem("access_token");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://127.0.0.1:8000/expense-tracker/monthly-expense-tracker-bar-data/${year}/${month}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (result.data.length > 0) {
          console.log(result.data);
          setData(result.data);
        } else {
          setNoData("No transactions found for the month");
        }
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/authentication/sign-in");
          sessionStorage.clear();
          window.location.reload();
        } else if (error.response?.status === 400) {
          alert(error.response.data.error);
        }
      }
    };
    fetchData();
  }, [year, month]);

  function valueFormatter(value) {
    return `INR ${value}`;
  }

  const handleBarClick = (event) => {
    const barElement = event.target; // Access the clicked DOM element
    const seriesId = barElement.getAttribute("data-series-id"); // Check if the element has a series ID
    const index = barElement.getAttribute("data-index"); // Index of the bar in the dataset

    if (seriesId && index) {
      const dataKey = seriesId; // The series corresponds to the dataKey
      const category = data[index].category; // Adjust based on your dataset structure
      const value = data[index][dataKey];

      alert(`Category: ${category}, Data Key: ${dataKey}, Value: ${value}`);
    } else {
      alert("Could not determine bar data. Check if the chart supports data mapping.");
    }
  };

  // Extract all unique subcategories from the data
  const subcategories = Array.from(
    new Set(data.flatMap((item) => Object.keys(item).filter((key) => key !== "category")))
  );

  // Create series array based on the subcategories
  const series = subcategories.map((subcategory) => ({
    dataKey: subcategory,
    label: subcategory,
    valueFormatter,
    // color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color for each subcategory
  }));

  return (
    <div>
      <h1>Monthly Overview</h1>
      {noData !== "" ? (
        <MDTypography>{noData}</MDTypography>
      ) : (
        <Card>
          <BarChart
            dataset={data}
            xAxis={[{ scaleType: "band", dataKey: "category" }]}
            series={series}
            onClick={(event) => handleBarClick(event)}
            width={900}
            height={500}
          />
        </Card>
      )}
    </div>
  );
}

ExpenseTrackerBarChart.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
};
