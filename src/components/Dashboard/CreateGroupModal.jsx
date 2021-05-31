/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import { useMutation, gql } from '@apollo/client';

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

const CREATE_GROUP = gql`
  mutation createChannel($info: CreateChannel!) {
    createChannel(info: $info) {
      name
      category
    }
  }
`;

const CreateGroupModal = () => {
  const classes = useStyles();
  const [groupName, setGroupName] = useState();
  const [groupCategory, setGroupCategory] = useState();
  const [createGroup] = useMutation(CREATE_GROUP);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      variables: {
        info: {
          name: groupName,
          category: groupCategory,
        },
      },
    });
    createGroup({
      variables: {
        info: {
          name: groupName,
          category: groupCategory,
        },
      },
    });
  };

  return (
    <div style={{ top: '20%', left: '35%' }} className={classes.groupModal}>
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
          onChange={(e, value) => setGroupCategory(value)}
          value={groupCategory}
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
          style={{ width: '90%' }}
          label="Group Name"
          margin="normal"
          variant="outlined"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Button type="button" size="large" className={classes.createButton} onClick={handleSubmit}>
          Create Group
        </Button>
      </div>
    </div>
  );
};

export default CreateGroupModal;
