import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import './App.css';
import SignUp from './signup/SignUp';
import Login from './login/Login';
import { ThemeProvider } from '@material-ui/styles';
import theme from './Reusable/theme';

const App = () => {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
    setLoginOpen(false);
  };

  const handleLogin = () => {
    setLoginOpen(true);
  };

  return (
    <div className="App">
      <h1>Hello, Learners!</h1>
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="secondary" onClick={handleOpen}>
          Sign Up
        </Button>
        <Button variant="contained" color="secondary" onClick={handleLogin}>
          Login
        </Button>
      </ThemeProvider>

      <SignUp open={open} handleClose={handleClose} />
      <Login open={loginOpen} handleClose={handleClose} />
    </div>
  );
};

export default App;
