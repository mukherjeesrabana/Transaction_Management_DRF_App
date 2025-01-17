import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const UserRegistrationTrend = () => {
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "http://127.0.0.1:8000/expense-tracker/user-registration-trend/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UserRegistrationTrend;
