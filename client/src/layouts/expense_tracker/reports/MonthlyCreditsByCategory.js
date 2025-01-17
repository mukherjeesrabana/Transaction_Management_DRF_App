import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import PropTypes from "prop-types";
import Unauthorized from "layouts/reusablemodals.js/Unauthorized";
import { useLocation, useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";

const MonthlyCreditsByCategoryChart = ({ year, month }) => {
  const [data, setData] = useState([["Category", "Amount"]]);
  const [noData, setNoData] = useState("");
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
          `http://127.0.0.1:8000/expense-tracker/monthly-credits-by-category/${year}/${month}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (result.data.length > 0) {
          const formattedData = [
            ["Category", "Amount"],
            ...result.data.map((item) => [
              `${item.subcategory} [${item.category}]`,
              parseFloat(item.total_amount),
            ]),
          ];
          setData(formattedData);
        } else {
          setNoData("No transactions found for the month");
        }
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
    fetchData();
  }, [year, month]);

  return (
    <div>
      <h1>Monthly Credits by Category</h1>
      {noData !== "" ? (
        <MDTypography>{noData}</MDTypography>
      ) : (
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={data}
          options={{
            title: "Monthly Credits by Category",
          }}
        />
      )}
    </div>
  );
};
MonthlyCreditsByCategoryChart.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
};

export default MonthlyCreditsByCategoryChart;
