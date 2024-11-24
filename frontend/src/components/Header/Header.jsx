// src/components/Header.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo or Icon */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Report Generating Agent
        </Typography>
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
