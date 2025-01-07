import React from "react";
import PropTypes from "prop-types";
import Chart from "react-google-charts";

const TransactionSummaryChart = ({ data }) => {
  // Transform data into Google Charts format
  const chartData = [
    ["Transaction Type", "Total Amount"], // Header row
    ...data.map((item) => [
      item.transaction_type,
      parseInt(item.total_amount, 10), // Convert total_amount to a number
    ]),
  ];

  return (
    <div>
      <Chart
        chartType="PieChart"
        data={chartData}
        options={{
          title: "Transaction Summary",
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

TransactionSummaryChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TransactionSummaryChart;
