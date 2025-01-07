import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import PropTypes from "prop-types";

const TransactionSummaryChart = ({ data }) => {
  console.log(data);
  return (
    <div>
      <h1>Transaction Summary</h1>
      {/* <Pie data={chartData} /> */}
    </div>
  );
};
TransactionSummaryChart.propTypes = {
  data: PropTypes.array.isRequired,
};
export default TransactionSummaryChart;
