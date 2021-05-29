import React from 'react';
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
  groupWidget(name) {
    return (
      <div
        className="groupWidget"
        style={{ textIndent: '15px', paddingTop: '10px', fontSize: '16px', color: '#D9DDE7' }}
      >
        {name}
      </div>
    );
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
          color: '#D9DDE7',
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
