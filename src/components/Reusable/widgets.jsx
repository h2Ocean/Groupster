import React from 'react';
import { Avatar } from '@material-ui/core';
import './styleWidgets.css';

const widgets = {
  button1(name, width) {
    return (
      <button
        className="button1"
        type="button"
        style={{
          width: `${width}`,
          minWidth: '100px',
          padding: '8px 16px',
          fontSize: '1.1rem',
          fontFamily: '"Roboto", sans-serif',
          fontWeight: '500',
          borderRadius: '7px',
          color: '#fff',
          backgroundColor: '#7E6ECB',
          lineHeight: '1.75',
          letterSpacing: '0.02857em',
          textTransform: 'uppercase',
          border: 'none',
        }}
      >
        {name}
      </button>
    );
  },
  button2(name, maximumWidth, height) {
    return (
      <button
        className="button2"
        type="button"
        style={{
          width: '80%',
          maxWidth: `${maximumWidth}`,
          height: `${height}` || 'auto',
          minWidth: '100px',
          padding: '8px 16px',
          fontSize: '1.1rem',
          fontFamily: '"Roboto", sans-serif',
          fontWeight: '500',
          borderRadius: '7px',
          color: '#7E6ECB',
          backgroundColor: '#F3DA75',
          lineHeight: '1.75',
          letterSpacing: '0.02857em',
          textTransform: 'uppercase',
          border: 'none',
        }}
      >
        {name}
      </button>
    );
  },
  groupWidget(name) {
    return (
      <div
        className="groupWidget"
        style={{ textIndent: '15px', paddingTop: '10px', fontSize: '16px' }}
      >
        {name}
      </div>
    );
  },
  memberAvatar(name, src) {
    return <Avatar alt={name} src={src} />;
  },
  member(name) {
    return (
      <div
        className="groupMember"
        style={{
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '10%',
          paddingTop: '10px',
        }}
      >
        <span
          id="face-icon"
          className="material-icons"
          style={{ fontSize: '4vh', paddingRight: '5px' }}
        >
          face
        </span>
        {name}
      </div>
    );
  },
  category(subject) {
    return (
      <div
        className="category"
        style={{
          width: 'fit-content',
          padding: '0.5em',
          fontWeight: '500',
          borderRadius: '6px',
          backgroundColor: '#F3DA75',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // border: '2px solid #7E6ECB',
        }}
      >
        {subject}
      </div>
    );
  },
};

export default widgets;
