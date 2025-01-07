import PropTypes from "prop-types";
import React from "react";
import Chart from "react-google-charts";

const DescriptionWiseExpenseBreakdown = ({ data }) => {
  const chartData = [
    ["ID", "Day of the Month", "Amount", "Transaction Type"], // Header
    ...data.map((item, index) => {
      const date = new Date(item.date);
      const dayOfMonth = isNaN(date.getDate()) ? 1 : date.getDate();
      console.log(dayOfMonth);
      return [
        item.description, // ID
        dayOfMonth, // Numeric day of the month
        parseFloat(item.amount), // Numeric amount
        item.transaction_type,
      ];
    }),
  ];
  return (
    <div>
      {chartData.length > 1 ? (
        <Chart
          chartType="BubbleChart"
          data={chartData}
          width="1000px"
          height="900px"
          options={{
            title: "Transaction Breakdown",
            hAxis: { title: "Day of the Month" },
            vAxis: { title: "Amount" },
            bubble: { textStyle: { fontSize: 20 } },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
DescriptionWiseExpenseBreakdown.propTypes = {
  data: PropTypes.array.isRequired,
};
export default DescriptionWiseExpenseBreakdown;
