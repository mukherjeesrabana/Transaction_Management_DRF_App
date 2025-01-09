import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import PropTypes from "prop-types";
import Unauthorized from "layouts/reusablemodals.js/Unauthorized";
import { useLocation, useNavigate } from "react-router-dom";

const MonthlyCategorywiseBreakdownChart = ({ year, month }) => {
  const [data, setData] = useState([["Category", "Expense", "Credit"]]);
  const token = sessionStorage.getItem("access_token");

  const [unauthorized, setUnauthorized] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/authentication/sign-in", { state: { from: location } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://127.0.0.1:8000/expense-tracker/monthly-categorywise-breakdown/${year}/${month}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const formattedData = [
          ["Category", "Credit", "Expense"],
          ...result.data.map((item) => [
            item.category,
            item.transaction_type === "Credit" ? parseFloat(item.total_amount) : 0,
            item.transaction_type === "Expense" ? parseFloat(item.total_amount) : 0,
          ]),
        ];
        setData(formattedData);
      } catch (error) {
        if (error.status === 401) {
          setUnauthorized(true);
        } else if (error.status == 400) {
          alert(error.response.data.error);
        }
      }
    };
    fetchData();
  }, [year, month]);

  return (
    <div>
      {unauthorized && (
        <Unauthorized
          openstate={unauthorized}
          content="Please login to continue"
          onLogin={handleLoginRedirect}
        />
      )}
      <h1>Monthly Categorywise Breakdown</h1>
      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={data}
        options={{
          title: "Monthly Categorywise Breakdown",
          chartArea: { width: "50%" },
          hAxis: {
            title: "Amount",
            minValue: 0,
          },
          vAxis: {
            title: "Category",
          },
        }}
      />
    </div>
  );
};

MonthlyCategorywiseBreakdownChart.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
};

export default MonthlyCategorywiseBreakdownChart;
