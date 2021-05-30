import React, { useState } from 'react';
import { Button, Menu, MenuItem, Typography, Badge } from '@material-ui/core';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import MailIcon from '@material-ui/icons/Mail';
import { useAuth } from '../../contexts/AuthContent';
import colors from '../Reusable/colors';
import groupster from '../Reusable/groupster_offset.svg';
import './navtop.css';
import Search from './Search';

// eslint-disable-next-line react/prop-types
const NavTopbar = ({ element, showSearchbar }) => {
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
      <img
        src={groupster}
        alt="logo"
        style={{
          marginLeft: '15px',
          height: '40px',
        }}
      />
      <div className="rightContent">
        <Typography variant="h6" style={{ marginLeft: '15px' }}>
          {element}
        </Typography>
        {showSearchbar === 'true' ? <Search /> : null}
        <Badge badgeContent={4} color="primary">
          <MailIcon />
        </Badge>
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
    </div>
  );
};

export default NavTopbar;
