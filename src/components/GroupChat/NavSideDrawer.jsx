import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  Button,
  List,
  ListItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { PeopleAltIcon } from '@material-ui/icons';
import RssFeedSharpIcon from '@material-ui/icons/RssFeedSharp';

const useStyles = makeStyles({
  list: {
    width: 200,
  },
  fullList: {
    width: 'auto',
  },
});

export default function NavSideDrawer() {
  const classes = useStyles();
  const [state, setState] = useState({
    channels: false,
    resources: false,
    members: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Channels', 'Resources', 'Members'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {' '}
              <RssFeedSharpIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      {['Channels', 'Resources', 'Members'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
