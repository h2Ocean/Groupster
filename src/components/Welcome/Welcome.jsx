import React from 'react';
import groupsterLogo from '../Reusable/groupster_logo.svg';

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
      }}
    >
      <h1 style={{ padding: '20px 0 40px 0' }}>{message}</h1>
      <img
        src={groupsterLogo}
        alt="welcomeLogo"
        style={{ borderRadius: '25px', border: '7px solid rgba(127, 91, 189, 0.3)', width: '65%' }}
      />
      <div style={{ height: '20%', display: 'flex', alignItems: 'center', fontSize: '20px' }}>
        Please to learn and grow together
      </div>
    </div>
  );
};

export default Welcome;
