/* eslint-disable no-unused-vars */
import React from 'react';
// import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
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
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <h2>Dashboard</h2>
      <Divider />
      <Interests />
    </Drawer>
  );
};

export default NavSidebar;
