import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContent';

const useStyles = makeStyles(() => ({
  subjects: {
    padding: '3vh',
  },
}));

const Interests = () => {
  const classes = useStyles();
  const { logout } = useAuth();
  const [loggedOut, setLoggedOut] = useState([]);

  const handleLogout = () => {
    logout();
    setLoggedOut(<Redirect to="/login" />);
  };

  return (
    <div>
      {loggedOut}
      <List>
        <li className={classes.subjects}>Art</li>
        <Divider />
        <li className={classes.subjects}>Science</li>
        <Divider />
        <li className={classes.subjects}>Technology</li>
        <Divider />
        <li className={classes.subjects}>Music</li>
        <Divider />
      </List>
      <Button style={{ marginTop: '55vh' }} type="button" onClick={handleLogout}>
        Signout
      </Button>
    </div>
  );
};

export default Interests;
