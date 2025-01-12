/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function data(month, year) {
  const [transactions, setTransactions] = useState([]);
  const token = sessionStorage.getItem("access_token");
  const [error, setError] = useState({});
  const fetchTransactions = async () => {
    try {
      const result = await axios.get(
        `http://127.0.0.1:8000/expense-tracker/monthly-transactions/${year}/${month}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions(result.data);
    } catch (error) {
      if (error.status === 401) {
        setError({
          status: 401,
          message: "unauthorized",
        });
      } else if (error.status == 400) {
        setError({
          status: 401,
          message: error.response.data.error,
        });
      }
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, [month, year]);
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const rows = transactions.map((transaction) => ({
    date: transaction.date,
    transaction_type: transaction.transaction_type,
    amount: transaction.amount,
    category: transaction.category,
    description: transaction.description,
  }));

  return {
    columns: [
      { Header: "Date", accessor: "date", width: "10%", align: "left" },
      { Header: "Transaction Type", accessor: "transaction_type", width: "10%", align: "left" },
      { Header: "Amount", accessor: "amount", align: "center" },
      { Header: "Category", accessor: "category", align: "center" },
      { Header: "Description", accessor: "description", width: "45%", align: "center" },
    ],

    rows,
    error,
  };
}
