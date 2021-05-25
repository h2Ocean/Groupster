import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SuggestedGroups from './SuggestedGroups';
import NavTopbar from './NavTopbar';
import GroupSidebar from './GroupSidebar/GroupSidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    marginTop: '20vh',
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const Dashboard = () => {
  // const [setOpen] = React.useState(true);
  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };
  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavTopbar
        className={classes.appBar}
        // handleDrawerOpen={handleDrawerOpen}
      />
      <GroupSidebar />
      <SuggestedGroups className={classes.content} />
    </div>
  );
};

export default Dashboard;
