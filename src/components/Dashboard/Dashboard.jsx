import React from 'react';
import NavSidebar from './NavSidebar/NavSidebar';
import SuggestedGroups from './SuggestedGroups';
import NavTopbar from '../NavTopbar/NavTopbar';

const Dashboard = () => {
  return (
    <div>
      <NavTopbar />
      <NavSidebar />
      <SuggestedGroups />
    </div>
  );
};

export default Dashboard;
