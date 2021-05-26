/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
  hide: {
    display: 'none',
  },
  drawer: {
    width: '20vw',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '20vw',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
}));

const GroupSidebar = (props) => {
  const [{ open }] = useState(props);
  const [{ setOpen }] = useState(props);
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem>Odd Cat Behavior</ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default GroupSidebar;
