import React from 'react';

const widget = {
  groupWidget(name) {
    return (
      <div
        className="groupWidget"
        style={{ textIndent: '15px', fontWeight: '500', paddingTop: '10px' }}
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
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '10%',
          paddingTop: '5px',
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
};

export default widget;
