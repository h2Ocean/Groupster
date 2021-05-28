import React, { useState } from 'react';
import widgets from '../Reusable/widgets';
import Channels from './NavComponents/Channels';

const NavSidebar = (props) => {
  const [currentChannel, selectChannel] = useState('knights');
  const [{ room }] = useState(props);

  // eslint-disable-next-line consistent-return
  const setStyle = (channel) => {
    if (channel === currentChannel) {
      return '#9fe5c3';
    }
  };
  return (
    <div id="NavSidebar" style={{ backgroundColor: '#D2D4DA' }}>
      {widgets.category('Sci')}
      <div className="navBarWidget">
        <div className="heading">Group</div>
        {widgets.groupWidget('Medieval History')}
      </div>
      <Channels />
      {/* <div className="navBarWidget">
        <div className="heading">Voice Chat</div>
      </div> */}
      <div className="navBarWidget">
        <div className="heading">Resources</div>
      </div>
    </div>
  );
};

export default NavSidebar;
