import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SuggestedGroups from './SuggestedGroups';
import NavTopbar from './NavTopbar';
import NavSidebar from './NavSidebar/NavSidebar';
import GroupSidebar from './GroupSidebar';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavTopbar key={open} className={classes.appBar} setOpen={setOpen} open={open} />
      <NavSidebar />
      <SuggestedGroups open={open} />
      <GroupSidebar key={open} setOpen={setOpen} open={open} />
    </div>
  );
};

export default Dashboard;
