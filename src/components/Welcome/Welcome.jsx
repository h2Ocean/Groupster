import React from 'react';
import { Link } from 'react-router-dom';
import groupsterLogo from '../Reusable/groupster_logo.svg';
import widgets from '../Reusable/widgets';

const Welcome = () => {
  const message = 'Welcome to';
  return (
    <div
      className="welcome"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <h1
        style={{
          padding: '20px 0 10px 0',
          fontFamily: "'Roboto', sans-serif",
          fontWeight: '400',
          color: '#3D3D3D',
        }}
      >
        {message}
      </h1>
      <img
        src={groupsterLogo}
        alt="welcomeLogo"
        style={{
          borderRadius: '25px',
          border: '7px solid rgba(127, 91, 189, 0.3)',
          maxWidth: '550px',
          width: '90%',
        }}
      />
      <div
        style={{
          height: '20%',
          minHeight: '100px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '24px',
          color: '#3D3D3D',
        }}
      >
        A place to learn and grow together
      </div>
      <Link to="/signup" style={{ width: '500px' }}>
        {widgets.button2('Click to Enter', '280px', '60px')}
      </Link>
    </div>
  );
};

export default Welcome;
