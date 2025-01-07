import { Card } from "@mui/material";
import axios from "axios";
import MDBox from "components/MDBox";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadTransaction() {
  const token = sessionStorage.getItem("access_token");
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

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
        "http://127.0.0.1:8000/transaction/upload-transactions/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
      navigate("/transactions");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <Card>
      <MDBox pt={4} pb={3} px={3}>
        <input type="file" accept=".xlsx" onChange={handleFileChange} ref={fileInputRef} />
      </MDBox>
    </Card>
  );
}
