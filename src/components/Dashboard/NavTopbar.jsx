/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    display: 'flex',
    width: '100% - 20vw',
    marginLeft: '20vw',
    backgroundColor: 'lightGrey',
    height: '5vh',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: 'calc(100% - 20vw)',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: '20vw',
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginLeft: '90vw',
  },
}));

const NavTopbar = (props) => {
  const [{ open }] = useState(props);
  const [{ setOpen }] = useState(props);
  const classes = useStyles();
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerOpen}
        className={clsx(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
    </AppBar>
  );
};

export default NavTopbar;
