// import { BarChart } from "@mui/x-charts";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { Card } from "antd";
import axios from "axios";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

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
  const processChartData = (rawData) => {
    const subCategories = new Set();

    rawData.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== "category") subCategories.add(key);
      });
    });

    return {
      processedData: rawData,
      keys: Array.from(subCategories),
    };
  };

  const { processedData, keys } = processChartData(data);
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#d45087", "#a05195"];

  return (
    <div>
      <h1>Monthly Overview</h1>
      {noData !== "" ? (
        <MDTypography>{noData}</MDTypography>
      ) : (
        <Card>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              {keys.map((key, index) => (
                <Bar key={key} dataKey={key} stackId="a" fill={colors[index % colors.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
}

ExpenseTrackerBarChart.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
};
