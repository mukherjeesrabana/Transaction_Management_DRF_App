import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card } from "antd";

const UserRoleDistribution = () => {
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "http://127.0.0.1:8000/expense-tracker/user-role-distribution/",
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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="count"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default UserRoleDistribution;
