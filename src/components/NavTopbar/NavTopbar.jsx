import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import './navtop.css';
import Search from './Search';

const NavTopbar = () => {
  const [anchor, setAnchor] = useState(null);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <div
      id="NavTopbar"
      style={{
        width: '100vw',
        backgroundColor: 'lightGrey',
        height: '60px',
        border: '1px solid rgba(0,0,0,.125)',
      }}
    >
      <a href="/" id="aDash">
        Dashboard
      </a>
      <Search />
      <Button aria-haspopup="true" onClick={handleClick}>
        <span className="material-icons profileIcon">account_circle</span>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={handleClose}
      >
        <MenuItem component={RouterLink} to="/profile">
          Account
        </MenuItem>
        <MenuItem component={RouterLink} to="/">
          Dashboard
        </MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default NavTopbar;
