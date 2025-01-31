'use client';

import React from 'react';

const LoginButton = () => {
  const handleLogin = () => {
    // Redirect to the API login route
    window.location.href = '/api/login';
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors"
    >
      Login with Spotify
    </button>
  );
};

export default LoginButton;
