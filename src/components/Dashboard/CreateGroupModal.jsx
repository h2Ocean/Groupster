/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  groupModal: {
    position: 'absolute',
    width: '30vw',
    height: '63vh',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
  },
  modalTitle: {
    textAlign: 'center',
  },
  summary: {
    textAlign: 'center',
  },
  createButton: {
    border: '1px solid',
    position: 'flex',
    width: '90%',
    marginTop: '20vh',
    marginLeft: '1.5vw',
  },
  form: {
    justifyContent: 'center',
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

const CreateGroupModal = () => {
  const classes = useStyles();
  return (
    <div style={{ top: '20%', left: '40%' }} className={classes.groupModal}>
      <h2 className={classes.modalTitle}>Create a New Group</h2>
      <p className={classes.summary}>
        Your group is where you and your friends can go to study. Create yours and start studying
        now.
      </p>
      <div className={classes.form}>
        <Autocomplete
          debug
          id="groupCategory"
          disableClearable
          options={categoryList.map((option) => option)}
          style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a Category"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
        />
        <TextField
          style={{ width: '90%', marginLeft: '1.5vw' }}
          label="Group Name"
          margin="normal"
          variant="outlined"
        />
        <Button type="button" size="large" className={classes.createButton}>
          Create Group
        </Button>
      </div>
    </div>
  );
};

export default CreateGroupModal;
