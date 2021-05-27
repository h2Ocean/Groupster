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
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '10%',
          paddingTop: '10px',
        }}
      >
        <span className="material-icons" style={{ fontSize: '18px', paddingRight: '5px' }}>
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
          height: '30px',
          width: '30px',
          fontWeight: '500',
          borderRadius: '6px',
          backgroundColor: '#F3DA75',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #7E6ECB',
        }}
      >
        {subject}
      </div>
    );
  },
};

export default widget;
