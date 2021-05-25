import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SuggestedGroups from './SuggestedGroups';
import NavTopbar from './NavTopbar';
import GroupSidebar from './GroupSidebar/GroupSidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
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
      <SuggestedGroups />
      <GroupSidebar />
    </div>
  );
};

export default Dashboard;
