import React, { useState } from 'react';
import widgets from '../Reusable/widgets';

const NavSidebar = () => {
  const [currentChannel, selectChannel] = useState('knights');
  // eslint-disable-next-line consistent-return
  const setStyle = (channel) => {
    if (channel === currentChannel) {
      return '#9fe5c3';
    }
  };
  return (
    <div id="NavSidebar" style={{ backgroundColor: '#D2D4DA' }}>
      <div className="navBarWidget">
        <div className="heading">Group</div>
        {widgets.groupWidget('Medieval History')}
      </div>
      <div className="navBarWidget">
        <div className="heading">Channels</div>
        <div className="channel">#knights</div>
        <div className="channel">#research paper</div>
      </div>
      <div className="navBarWidget">
        <div className="heading">Voice Chat</div>
      </div>
      <div className="navBarWidget">
        <div className="heading">Resources</div>
      </div>
    </div>
  );
};

export default NavSidebar;
