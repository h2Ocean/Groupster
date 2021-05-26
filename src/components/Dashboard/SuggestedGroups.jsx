/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
// import { ThemeProvider } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  content: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -'20vw',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  header: {
    paddingTop: '5vh',
  },
  searchGroups: {
    width: '100%',
    padding: '1vh',
    textAlign: 'center',
    fontSize: '2vh',
  },
  title: {
    fontSize: '5vh',
    fontFamily: 'Roboto',
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

const SuggestedGroups = (props) => {
  const [{ open }] = useState(props);
  const classes = useStyles();
  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <Container maxWidth="lg" className={classes.header}>
        <h1 className={classes.title}>Discover More Groups</h1>
        <Autocomplete
          freeSolo
          id="groupSearch"
          disableClearable
          options={categoryList.map((option) => option)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Groups"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
        />
      </Container>
    </main>
  );
};

export default SuggestedGroups;
