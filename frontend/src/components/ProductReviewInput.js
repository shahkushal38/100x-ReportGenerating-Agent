// src/components/ProductReviewInput.js

import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Typography,
  Box,
  TextField,
} from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';

const ProductReviewInput = ({ onIngestSuccess }) => {
  const [productUrl, setProductUrl] = useState('');

  const handleFetchReviews = () => {
    const token = localStorage.getItem('token');
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/fetch-reviews`, {
      product_url: productUrl,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        alert('Product reviews fetched and ingested successfully.');
        onIngestSuccess({ type: 'Product Reviews', name: productUrl });
        setProductUrl('');
      })
      .catch((error) => {
        console.error('Error fetching product reviews:', error);
        alert('An error occurred while fetching product reviews.');
      });
  };

  return (
    <Box>
      <Box textAlign="center">
        <RateReviewIcon style={{ fontSize: 40, color: '#3f51b5' }} />
        <Typography variant="h6" gutterBottom>
          Generate Report from Product Reviews
        </Typography>
      </Box>
      <TextField
        label="Product URL"
        value={productUrl}
        onChange={(e) => setProductUrl(e.target.value)}
        placeholder="Enter Amazon product URL"
        fullWidth
        margin="normal"
      />
      <Box mt={2} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleFetchReviews}>
          Fetch Reviews and Ingest
        </Button>
      </Box>
    </Box>
  );
};

export default ProductReviewInput;
