/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Dialog } from '@material-ui/core';
import LoginForm from './LoginForm';

const Login = (props) => {
  const [{ setUsername }] = useState(props);
  const [{ open }] = useState(props);
  const [{ handleClose }] = useState(props);
  const [{ setIsLoggedIn }] = useState(props);
  return (
    <Dialog open={open} onClose={handleClose}>
      <LoginForm
        setIsLoggedIn={setIsLoggedIn}
        open={open}
        setValidUsername={setUsername}
        handleClose={handleClose}
      />
    </Dialog>
  );
};

export default Login;
