import PropTypes from "prop-types";
import React from "react";
import Chart from "react-google-charts";

const DescriptionWiseExpenseBreakdown = ({ data }) => {
  const chartData = [
    ["ID", "Day of the Month", "Amount", "Transaction Type", "Amount"], // Header
    ...data.map((item, index) => {
      const date = new Date(item.date);
      const dayOfMonth = isNaN(date.getDate()) ? 1 : date.getDate();

      return [
        item.description, // ID
        dayOfMonth, // Numeric day of the month
        parseFloat(item.amount), // Numeric amount
        item.transaction_type,
        parseFloat(item.amount), // Numeric amount
      ];
    }),
  ];
  const maxAmount = Math.max(...data.map((item) => parseFloat(item.amount))) || 0;
  const vAxisMax = maxAmount + maxAmount * 0.1;
  return (
    <div>
      {chartData.length > 1 ? (
        <Chart
          chartType="BubbleChart"
          data={chartData}
          width="100%"
          height="700px"
          options={{
            title: "Expenses Breakdown",
            hAxis: {
              title: "Day of the Month",
              ticks: Array.from({ length: 31 }, (_, i) => i * 4 + 1).filter((day) => day <= 31), // Generate whole number ticks from 1 to 31
            },
            vAxis: {
              title: "Amount",
              viewWindow: { max: vAxisMax, min: 0 }, // Ensure bubbles don't get cut off
            },
            bubble: {
              textStyle: {
                fontSize: 20,
                fontName: "Times-Roman",
                color: "green",
                bold: true,
                italic: true,
              },
            },
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
