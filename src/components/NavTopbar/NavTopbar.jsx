import React, { useState } from 'react';
import { Button, Menu, MenuItem, Typography } from '@material-ui/core';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContent';
import colors from '../Reusable/colors';

import './navtop.css';
import Search from './Search';

const NavTopbar = () => {
  const [anchor, setAnchor] = useState(null);
  const [loggedOut, setLoggedOut] = useState([]);
  const { logout } = useAuth();

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    setLoggedOut(<Redirect to="/login" />);
  };

  return (
    <div
      id="NavTopbar"
      style={{
        width: '100vw',
        backgroundColor: '#d4d6dc',
        height: '60px',
      }}
    >
      <Typography variant="h6" style={{ marginLeft: '15px' }}>
        Medieval History
      </Typography>
      <Search />
      <Button aria-haspopup="true" onClick={handleClick}>
        <span className="material-icons profileIcon">account_circle</span>
      </Button>
      {loggedOut}
      <Menu
        id="simple-menu"
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={handleClose}
      >
        <MenuItem component={RouterLink} to="/profile">
          Profile
        </MenuItem>
        <MenuItem component={RouterLink} to="/">
          Dashboard
        </MenuItem>
        <MenuItem component={RouterLink} to="/explore">
          Preferences
        </MenuItem>
        <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
      </Menu>
    </div>
  );
};

export default NavTopbar;
