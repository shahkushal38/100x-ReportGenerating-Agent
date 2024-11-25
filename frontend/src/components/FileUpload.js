// src/components/FileUpload.js

import React, { useState } from "react";
import axios from "axios";
import { Button, Typography, Box, Input } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Spinner } from "@fluentui/react";

const FileUpload = ({ onIngestSuccess }) => {
  const [file, setFile] = useState(null);
  const [hideSpinner, setHideSpinner] = useState(true);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    setHideSpinner(false);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("File uploaded and ingested successfully.");
        setFile(null);
        setHideSpinner(true);
        const responseData = response.data;
        if (onIngestSuccess)
          onIngestSuccess({
            connectedData: { type: "File Upload", name: file.name },
            ...responseData,
          });
      })
      .catch((error) => {
        setHideSpinner(true);
        console.error("Error uploading file:", error);
        alert("An error occurred during file upload.");
      });
  };

  return (
    <Box textAlign="center">
      <UploadFileIcon style={{ fontSize: 40, color: "#3f51b5" }} />
      <Typography variant="h6" gutterBottom>
        Upload a File
      </Typography>
      <Input
        type="file"
        onChange={handleFileChange}
        inputProps={{ accept: ".csv, .xlsx, .json, .txt" }}
      />
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file}
        >
          Upload and Ingest 
          <Spinner hidden={hideSpinner} style={{paddingLeft: '10px'}} />
        </Button>
      </Box>
    </Box>
  );
};

export default FileUpload;
