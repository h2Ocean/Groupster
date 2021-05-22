import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import './App.css';
import SignUp from './signup/SignUp';
import Login from './login/Login';

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
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Sign Up
      </Button>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <SignUp open={open} handleClose={handleClose} />
      <Login open={loginOpen} handleClose={handleClose} />
    </div>
  );
};

export default App;
