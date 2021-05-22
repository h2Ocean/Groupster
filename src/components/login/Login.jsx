/* eslint-disable react/prop-types */
import React from 'react';
import { Dialog } from '@material-ui/core';
import LoginForm from './LoginForm';

const Login = ({ open, handleClose }) => (
  <Dialog open={open} onClose={handleClose}>
    <LoginForm open={open} handleClose={handleClose} />
  </Dialog>
);

export default Login;
