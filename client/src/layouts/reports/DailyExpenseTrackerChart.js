import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

const DailyExpenseTrackerChart = () => {
  const [data, setData] = useState([["Date", "Expenses", "Incomes"]]);

  const token = sessionStorage.getItem("access_token");

  const fetchData = () => {
    axios
      .get("http://127.0.0.1:8000/transaction/daily-expense-income-tracker/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const formattedData = res.data.map((item, index) => {
          if (index === 0) return item; // Keep the header row as is
          const date = new Date(item[0]);
          const day = date.getDate().toString().padStart(2, "0"); // Extract and format the day part
          return [day, parseFloat(item[1]), parseFloat(item[2])];
        });
        setData(formattedData);
      })
      .catch((e) => console.log(e));
  };
  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);
  const options = {
    title: "Daily Income Expense Tracker",
    vAxis: { title: "Amount" },
    hAxis: { title: "Date" },
    seriesType: "bars",
    series: { 5: { type: "line" } },
  };

  return (
    <div>
      <Chart chartType="ComboChart" width="100%" height="350px" data={data} options={options} />
    </div>
  );
};

export default DailyExpenseTrackerChart;
