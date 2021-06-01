/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import clsx from 'clsx';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Toolbar,
  Breadcrumbs,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import { useAuth } from '../../contexts/AuthContent';
import GroupSidebar from './GroupSidebar';
import '../NavTopbar/navtop.css';
import groupster from '../Reusable/groupster_offset.svg';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  appBar: {
    width: '100%',
    marginLeft: '0vw',
    backgroundColor: '#d4d6dc',
    boxShadow: 'none',
    height: '60px',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: '80vw',
    marginLeft: '20vw',
    marginRight: '0vw',
    height: '60px',
    backgroundColor: '#d4d6dc',
    boxShadow: 'none',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginRight: '88vw',
  },
  groupModal: {
    position: 'absolute',
    width: '50vw',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
  },
  // profileIcon: {
  //   marginLeft: '91vw',
  // },
  profileIconShift: {
    marginLeft: '72.86vw',
  },
}));

const NavTopbar = (props) => {
  const [{ open }] = useState(props);
  const [{ setOpen }] = useState(props);
  const [loggedOut, setLoggedOut] = useState([]);
  const [anchor, setAnchor] = useState(null);
  const classes = useStyles();
  const { logout } = useAuth();
  const [{ category }] = useState(props);
  const [{ group }] = useState(props);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleIconClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleIconClose = () => {
    setAnchor(null);
  };

  const handleLogout = () => {
    handleIconClose();
    logout();
    setLoggedOut(<Redirect to="/login" />);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <div className="leftContent">
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              size="small"
              className={clsx(classes.menuButton, open && classes.hide)}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <MenuIcon />
            </IconButton>

            <img
              src={groupster}
              alt="logo"
              style={{
                marginLeft: '15px',
                height: '40px',
              }}
            />

            <Typography
              variant="h6"
              style={{
                marginLeft: '15px',
                marginTop: '5px',
                border: '1px solid darkGrey',
                borderRadius: '10px',
                padding: '0px 5px',
                color: '#482F75',
              }}
            >
              Dashboard
            </Typography>
            <Breadcrumbs
              aria-label="breadcrumb"
              maxItems={1}
              style={{ marginTop: '10px', marginLeft: '15px' }}
            >
              <div className="breadcrumbs">{category}</div>
              <Typography className="breadcrumbs" component={RouterLink} to="/chat">
                {group}
              </Typography>
            </Breadcrumbs>
          </div>
          <Button
            aria-haspopup="true"
            className={clsx(classes.profileIcon, open && classes.profileIconShift)}
            onClick={handleIconClick}
          >
            <span className="material-icons profileIcon">account_circle</span>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchor}
            keepMounted
            open={Boolean(anchor)}
            onClose={handleIconClose}
          >
            <MenuItem component={RouterLink} to="/profile">
              Profile
            </MenuItem>
            <MenuItem component={RouterLink} to="/explore">
              Preferences
            </MenuItem>
            <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <GroupSidebar setOpen={handleDrawerOpen} setClose={handleDrawerClose} open={open} />
    </div>
  );
};

export default NavTopbar;
