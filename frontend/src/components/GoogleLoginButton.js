// src/components/GoogleLoginButton.js

import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onSuccess, onError }) => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        onSuccess(credentialResponse);
      }}
      onError={() => {
        onError();
      }}
    />
  );
};

export default GoogleLoginButton;
