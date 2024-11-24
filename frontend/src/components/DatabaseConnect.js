// src/components/DatabaseConnect.js

import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';

const DatabaseConnect = ({ onIngestSuccess }) => {
  const [dbType, setDbType] = useState('mysql');
  const [connectionDetails, setConnectionDetails] = useState('');
  const [query, setQuery] = useState('');

  const handleConnect = () => {
    const token = localStorage.getItem('token');
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/connect-database`, {
      db_type: dbType,
      connection_details: connectionDetails,
      query: query,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        alert('Database data ingested successfully.');
        setConnectionDetails('');
        setQuery('');
        if (onIngestSuccess) onIngestSuccess({ type: 'Database', name: dbType });
      })
      .catch((error) => {
        console.error('Error connecting to database:', error);
        alert('An error occurred during database connection.');
      });
  };

  return (
    <Box>
      <Box textAlign="center">
        <StorageIcon style={{ fontSize: 40, color: '#3f51b5' }} />
        <Typography variant="h6" gutterBottom>
          Connect to a Database
        </Typography>
      </Box>
      <FormControl fullWidth margin="normal">
        <InputLabel>Database Type</InputLabel>
        <Select
          value={dbType}
          onChange={(e) => setDbType(e.target.value)}
        >
          <MenuItem value="mysql">MySQL</MenuItem>
          <MenuItem value="postgresql">PostgreSQL</MenuItem>
          {/* Add more options as needed */}
        </Select>
      </FormControl>
      <TextField
        label="Connection Details"
        value={connectionDetails}
        onChange={(e) => setConnectionDetails(e.target.value)}
        placeholder="username:password@host:port/database"
        fullWidth
        margin="normal"
      />
      <TextField
        label="SQL Query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="SELECT * FROM your_table"
        fullWidth
        multiline
        rows={3}
        margin="normal"
      />
      <Box mt={2} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleConnect}>
          Connect and Ingest
        </Button>
      </Box>
    </Box>
  );
};

export default DatabaseConnect;
