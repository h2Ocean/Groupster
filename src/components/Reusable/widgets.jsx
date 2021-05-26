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
};

export default widget;
