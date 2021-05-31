import React, { useState } from 'react';
import { Container, TextField, makeStyles, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { sizing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const Search = () => {
  const classes = useStyles();
  const [word, setSearchWord] = useState('');
  return (
    <Container id="searchChat" className={classes.root}>
      <TextField
        id="outlined-search"
        className={classes.input}
        color="white"
        size="small"
        label="Search Chat"
        type="search"
        variant="outlined"
        onChange={(e) => setSearchWord(e.target.value)}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon className="searchIcon" />
      </IconButton>
    </Container>
  );
};

export default Search;
