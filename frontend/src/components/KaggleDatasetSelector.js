// src/components/KaggleDatasetSelector.js

import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Typography,
  Box,
  TextField,
} from '@mui/material';
import DatasetIcon from '@mui/icons-material/Dataset';

const KaggleDatasetSelector = ({ onIngestSuccess }) => {
  const [datasetName, setDatasetName] = useState('');

  const handleIngestDataset = () => {
    const token = localStorage.getItem('token');
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/ingest-kaggle-dataset`, {
      dataset_name: datasetName,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        alert('Kaggle dataset ingested successfully.');
        onIngestSuccess({ type: 'Kaggle Dataset', name: datasetName });
        setDatasetName('');
      })
      .catch((error) => {
        console.error('Error ingesting Kaggle dataset:', error);
        alert('An error occurred during Kaggle dataset ingestion.');
      });
  };

  return (
    <Box>
      <Box textAlign="center">
        <DatasetIcon style={{ fontSize: 40, color: '#3f51b5' }} />
        <Typography variant="h6" gutterBottom>
          Select a Kaggle Dataset
        </Typography>
      </Box>
      <TextField
        label="Dataset Name"
        value={datasetName}
        onChange={(e) => setDatasetName(e.target.value)}
        placeholder="e.g., username/dataset-name"
        fullWidth
        margin="normal"
      />
      <Box mt={2} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleIngestDataset}>
          Ingest Dataset
        </Button>
      </Box>
    </Box>
  );
};

export default KaggleDatasetSelector;
