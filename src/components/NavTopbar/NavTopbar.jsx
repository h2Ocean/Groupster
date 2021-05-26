import React from 'react';
import './navtop.css';
import Search from './Search';

const NavTopbar = () => (
  <div
    id="NavTopbar"
    style={{
      width: '100vw',
      backgroundColor: 'rgba(0,0,0,.03)',
      height: '40px',
      border: '1px solid rgba(0,0,0,.125)',
    }}
  >
    <a href="/" id="aDash">
      Dashboard
    </a>
    <Search />
    <span className="material-icons profileIcon">account_circle</span>
  </div>
);

export default NavTopbar;
