/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../../contexts/AuthContent';
import Interests from './Interests';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '20vw',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '20vw',
  },
}));

const NavSidebar = () => {
  const { logout } = useAuth();
  const [loggedOut, setLoggedOut] = useState([]);
  const classes = useStyles();

  const handleLogout = () => {
    logout();
    setLoggedOut(<Redirect to="/login" />);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
      style={{ position: 'relative' }}
    >
      {loggedOut}
      <h2>Dashboard</h2>
      <Divider />
      <Interests />
      <Button style={{ position: 'absolute', bottom: 0 }} type="button" onClick={handleLogout}>
        Signout
      </Button>
    </Drawer>
  );
};

export default NavSidebar;
