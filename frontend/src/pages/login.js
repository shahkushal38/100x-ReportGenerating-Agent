// src/pages/Login.js

import React from 'react';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, { credential });
      // Store the JWT token received from backend
      localStorage.setItem('token', res.data.access_token);
      // Redirect to home page
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Login failed. Please try again.');
    }
  };

  const handleLoginFailure = () => {
    console.error('Google Login Failed');
    alert('Login failed. Please try again.');
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <GoogleLoginButton
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </Container>
  );
};

export default Login;
