/* eslint-disable react/prop-types */
import React from 'react';
import { Dialog } from '@material-ui/core';
import Form from './SignUpForm';

const SignUp = ({ open, handleClose }) => (
  <>
    <Dialog open={open} onClose={handleClose}>
      <Form handleClose={handleClose} />
    </Dialog>
  </>
);

export default SignUp;
