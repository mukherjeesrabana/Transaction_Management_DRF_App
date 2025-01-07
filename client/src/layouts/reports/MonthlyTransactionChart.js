import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const MonthlyTransactionChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Total Amount",
        data: data.map((item) => item.total_amount),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return <Line data={chartData} />;
};

MonthlyTransactionChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default MonthlyTransactionChart;
