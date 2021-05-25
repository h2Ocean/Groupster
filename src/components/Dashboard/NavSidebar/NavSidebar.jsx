import React from 'react';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import JoinedGroups from './JoinedGroups';
import AllGroups from './AllGroups';

const NavSidebar = () => {
  return (
    <div id="NavSidebar" style={{ backgroundColor: 'green' }}>
      <JoinedGroups />
      <Divider />
      <AllGroups />
    </div>
  );
};

export default NavSidebar;
