import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const AccountBalanceChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.account_number),
    datasets: [
      {
        label: "Balance",
        data: data.map((item) => item.balance),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};
AccountBalanceChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AccountBalanceChart;
