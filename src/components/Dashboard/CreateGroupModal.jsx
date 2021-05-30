/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  groupModal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    minWidth: '320px',
    width: '30vw',
    height: '63vh',
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    borderRadius: '20px',
    padding: '0 30px 20px 30px',
  },
  modalTitle: {
    textAlign: 'center',
    fontFamily: 'Quicksand',
    paddingBottom: '10px',
  },
  summary: {
    textAlign: 'center',
    maxWidth: '80%',
    alignSelf: 'center',
  },
  createButton: {
    border: '1px solid',
    width: '90%',
    marginTop: '30px',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '20px',
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
          style={{ width: '90%' }}
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
        <TextField style={{ width: '90%' }} label="Group Name" margin="normal" variant="outlined" />
        <Button type="button" size="large" className={classes.createButton}>
          Create Group
        </Button>
      </div>
    </div>
  );
};

export default CreateGroupModal;
