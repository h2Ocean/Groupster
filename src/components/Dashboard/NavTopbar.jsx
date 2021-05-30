/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import NavSidebar from './NavSidebar/NavSidebar';
import '../NavTopbar/navtop.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    display: 'flex',
    width: '100%vw',
    marginLeft: '0vw',
    backgroundColor: 'lightGrey',
    border: '1px solid rgba(0,0,0,.125)',
    height: '8vh',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    display: 'flex',
    width: '100% - 20vw',
    marginLeft: '20vw',
    marginRight: '0vw',
    height: '8vh',
    backgroundColor: 'lightGrey',
    border: '1px solid rgba(0,0,0,.125)',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginLeft: '88vw',
  },
  createGroupButton: {
    position: 'absolute',
    marginLeft: '20vw',
  },
  groupModal: {
    position: 'absolute',
    width: '50vw',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
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
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="primary"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          size="small"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          Your Groups
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavTopbar;
