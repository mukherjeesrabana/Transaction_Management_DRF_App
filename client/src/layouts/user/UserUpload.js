import { Card } from "@mui/material";
import axios from "axios";
import MDBox from "components/MDBox";
import Unauthorized from "layouts/reusablemodals.js/Unauthorized";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserUpload({ fetchUsers }) {
  const token = sessionStorage.getItem("access_token");
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const [unauthorized, setUnauthorized] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    if (file !== null) {
      handleUpload();
    }
  }, [file, token]);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/expense-tracker/upload-users/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
      fetchUsers();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
      if (error.status === 401) {
        navigate("/authentication/sign-in");
        window.location.reload();
      } else if (error.status == 400) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      <input type="file" accept=".xlsx" onChange={handleFileChange} ref={fileInputRef} />;
    </>
  );
}
UserUpload.propTypes = {
  fetchUsers: PropTypes.func,
};
