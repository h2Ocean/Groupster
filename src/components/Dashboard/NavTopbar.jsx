/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GroupSidebar from './GroupSidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    display: 'flex',
    width: '100% - 20vw',
    marginLeft: '20vw',
    backgroundColor: 'lightGrey',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    display: 'flex',
    width: '100% - 40vw',
    marginLeft: '20vw',
    marginRight: '20vw',
    backgroundColor: 'lightGrey',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <IconButton
        style={{ label: 'Your Groups' }}
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerOpen}
        className={clsx(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <GroupSidebar key={open} setOpen={setOpen} open={open} />
    </AppBar>
  );
};

export default NavTopbar;
