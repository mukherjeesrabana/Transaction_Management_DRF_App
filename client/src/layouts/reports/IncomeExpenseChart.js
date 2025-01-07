import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const IncomeVsExpensesChart = ({ data }) => {
  const chartData = [
    ["Type", "Amount"], // Header row
    ...data.map((item) => [
      item.type,
      parseInt(item.amount, 10), // Convert total_amount to a number
    ]),
  ];
  return (
    <div>
      <Chart
        chartType="PieChart"
        data={chartData}
        options={{
          title: "Income vs Expenses",
          is3D: true, // Makes the chart 3D (optional)
          pieHole: 0.4, // For a doughnut chart, set this value between 0 and 1
          legend: { position: "bottom" },
        }}
        width="100%"
        height="400px"
        legendToggle
      />
    </div>
  );
};
IncomeVsExpensesChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default IncomeVsExpensesChart;
