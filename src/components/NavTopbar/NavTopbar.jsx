import React from 'react';
import './navtop.css';
import Search from './Search';

const NavTopbar = () => (
  <div
    id="NavTopbar"
    style={{
      width: '100vw',
      backgroundColor: 'rgba(0,0,0,.03)',
      height: '30px',
      border: '1px solid rgba(0,0,0,.125)',
    }}
  >
    <Search />
    <span className="material-icons profileIcon">account_circle</span>
  </div>
);

export default NavTopbar;
