import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col } from "antd";

const UserStatistics = () => {
  const [stats, setStats] = useState({});
  const token = sessionStorage.getItem("access_token");

  useEffect(() => {
    const fetchStats = async () => {
      const result = await axios.get("http://127.0.0.1:8000/expense-tracker/user-statistics/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(result.data);
    };
    fetchStats();
  }, []);

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Total Users">{stats.total_users}</Card>
      </Col>
      <Col span={8}>
        <Card title="Active Users">{stats.active_users}</Card>
      </Col>
      <Col span={8}>
        <Card title="Inactive Users">{stats.inactive_users}</Card>
      </Col>
      <Col span={8}>
        <Card title="Admin Users">{stats.admin_users}</Card>
      </Col>
      <Col span={8}>
        <Card title="Standard Users">{stats.standard_users}</Card>
      </Col>
    </Row>
  );
};

export default UserStatistics;
