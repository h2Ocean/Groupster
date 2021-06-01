/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FaMicroscope, FaPaintBrush, FaLaptop, FaSuitcase } from 'react-icons/fa';
import { AiOutlineCalculator } from 'react-icons/ai';
import { IoChatbubblesOutline, IoGlobeOutline } from 'react-icons/io5';
import { ImBooks } from 'react-icons/im';
import { BsMusicNoteBeamed } from 'react-icons/bs';
// import MuiAccordion from '@material-ui/core/Accordion';
// import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
// import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import List from '@material-ui/core/List';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '20vw',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: '20vw',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '5.5px',
  },
}));

const categoryList = [
  'Math',
  'Language',
  'Science',
  'Literature',
  'Social Science',
  'Art',
  'Technology',
  'Business',
  'Music',
];

const icons = [
  <AiOutlineCalculator />,
  <IoChatbubblesOutline />,
  <FaMicroscope />,
  <ImBooks />,
  <IoGlobeOutline />,
  <FaPaintBrush />,
  <FaLaptop />,
  <FaSuitcase />,
  <BsMusicNoteBeamed />,
];

const GroupSidebar = (props) => {
  const [{ open }] = useState(props);
  const [{ setClose }] = useState(props);
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={setClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {categoryList.map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon style={{ fontSize: '24px' }}>{icons[index]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default GroupSidebar;
