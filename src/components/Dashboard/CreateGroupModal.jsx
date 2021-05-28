/* eslint-disable arrow-body-style */
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  groupModal: {
    position: 'absolute',
    width: '30vw',
    height: '63vh',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
  },
}));

const CreateGroupModal = () => {
  const classes = useStyles();
  return (
    <div style={{ top: '20%', left: '40%' }} className={classes.groupModal}>
      <h2>Text in a modal</h2>
      <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
    </div>
  );
};

export default CreateGroupModal;
