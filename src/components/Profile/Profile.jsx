import React, { useState } from 'react';
import { Container, CssBaseline, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

}));

const Profile = (props) => {
  const [{ username }] = useState(props);
  const [bio, setBio] = useState('');
  const [{ name }, setName] = useState(props);
  const [{ email }, setEmail] = useState(props);
  const [{ age }, setAge] = useState(props);
  const [groups, setGroups] = useState(props);

  return (
    <div>
      <Container component="main">
        <CssBaseline />
        <form>
          <Grid container spacing={2}>
            Hello
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Profile;
