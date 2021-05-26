/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
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
    transition: theme.transitions.create('margin', {
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
      <Toolbar>
        <Button size="medium" color="primary" className={classes.createGroupButton}>
          Create Group
        </Button>
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
        <GroupSidebar key={open} setOpen={setOpen} open={open} />
      </Toolbar>
    </AppBar>
  );
};

export default NavTopbar;
