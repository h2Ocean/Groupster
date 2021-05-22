import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import './App.css';
import SignUp from './signup/SignUp';

const App = () => {
  const [open, setOpen] = useState(false);

  // function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <h1>Hello, Learners!</h1>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Sign Up
      </Button>
      <SignUp open={open} handleClose={handleClose} />
    </div>
  );
};

export default App;
