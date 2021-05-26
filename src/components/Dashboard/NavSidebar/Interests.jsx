import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  subjects: {
    padding: '3vh',
  },
}));

const Interests = () => {
  const classes = useStyles();
  return (
    <List>
      {/* <li>Himalayan food recipes</li>
      <li>Zoomer meme culture</li>
      <li>Pharmacological Chemistry</li> */}
      <li className={classes.subjects}>Art</li>
      <Divider />
      <li className={classes.subjects}>Science</li>
      <Divider />
      <li className={classes.subjects}>Technology</li>
      <Divider />
      <li className={classes.subjects}>Music</li>
      <Divider />
    </List>
  );
};

export default Interests;
