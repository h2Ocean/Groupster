/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Container, TextField, Button, Paper, Divider } from '@material-ui/core';
import { auth } from '../../firebase';
import './Profile.css';
import theme1 from '../Reusable/theme';
import NavTopbar from '../NavTopbar/NavTopbar';

const GET_USER = gql`
  query getProfile($email: String!) {
    getProfile(email: $email) {
      email
      username
      name
      age
      bio
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  header: {
    // width: '80vw',
    borderBottom: '2px solid #7E6ECB',
    padding: '10px',
  },
  paper: {
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid lightGrey',
    marginRight: '35px',
    marginBottom: '20px',
    flexGrow: '1',
  },
  divider: {
    background: '#7E6ECB',
  },
}));

const UPDATE_USER = gql`
  mutation updateBio($info: UpdateBio!) {
    updateBio(info: $info) {
      name
      email
      bio
    }
  }
`;

const Profile = () => {
  const [isLogged, setIsLogged] = useState([]);
  const [fullName, setFullName] = useState();
  const [userName, setUserName] = useState();
  const [profilePic, setProfilePic] = useState();
  const [userBio, setUserBio] = useState();
  let userEmail;
  const [email, setEmail] = useState();
  const [groups] = useState([
    'Medieval History',
    'Asian Cuisine',
    '80s Cars',
    'Fresh Prince of Bel Air Fan Club',
  ]);
  const [edit, setEdit] = useState(false);
  const [getUser, { data }] = useLazyQuery(GET_USER, {
    variables: {
      email: userEmail,
    },
  });
  const classes = useStyles();

  const [updateProfile] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (!auth.currentUser) {
      setIsLogged(<Redirect to="/signup" />);
    } else {
      userEmail = auth.currentUser.email;
      getUser({
        variables: {
          email: userEmail,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (data) {
      setFullName(data.getProfile[0].name);
      setUserName(data.getProfile[0].username);
      setEmail(data.getProfile[0].email);
      setUserBio(data.getProfile[0].bio);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      variables: {
        info: {
          name: fullName,
          email,
          bio: userBio,
        },
      },
    });
    updateProfile({
      variables: {
        info: {
          name: fullName,
          email,
          bio: userBio,
        },
      },
    });
    setEdit(false);
  };

  if (!edit) {
    return (
      <>
        <NavTopbar showSearchbar="false" />
        <Container className="Profile">
          <h1 className={classes.header}>Profile Page</h1>
          <div className="profilePageBody">
            <div style={{ display: 'flex', justifyContent: 'center', flexGrow: '0.3' }}>
              <Paper className={classes.paper} elevation="1">
                <img
                  src="https://drive.google.com/thumbnail?id=1fzO160F2ECqqz_nWgkiVHSKcBTtOy1Fs"
                  alt="profilePhoto"
                  style={{ borderRadius: '5px', flexGrow: '0.8' }}
                />
              </Paper>
            </div>

            <div className="profileInfo">
              <div className="core">
                <h2 className="headerName">Full Name&nbsp;</h2>
                <p>{fullName}</p>
              </div>
              <Divider />
              <div className="core">
                <h2 className="headerName">Username&nbsp;</h2>
                <p>{userName}</p>
              </div>
              <Divider />
              <div className="core">
                <h2 className="headerName">Email</h2>
                <p>{email}</p>
              </div>
              <Divider />
              <h2>Biography</h2>
              <p>{userBio}</p>
              <Divider />
              <h2>Study Groups</h2>
              {groups.map((group) => (
                <p key={group.id}>{group}</p>
              ))}
            </div>
          </div>
          <ThemeProvider theme={theme1}>
            <div style={{ borderBottom: '2px solid #7E6ECB', marginTop: '15px' }} />
            <div className="profileButtonContainer">
              <Button
                className="profileButton"
                aria-label="edit profile"
                name="edit"
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => setEdit(true)}
              >
                Edit Profile
              </Button>
            </div>
          </ThemeProvider>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavTopbar title="Groupster" showSearchbar={false} />
      <Container className="Profile">
        <h1 className={classes.header}>Profile Page</h1>
        <div className="profilePageEdit">
          <h2>Full Name:&nbsp;</h2>
          <TextField
            name="name"
            variant="outlined"
            required
            id="name"
            label="Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <h2>Username:&nbsp;</h2>
          <p>{userName}</p>
          <h2>Biography</h2>
          <TextField
            name="biography"
            variant="outlined"
            fullWidth
            multiline
            rowsMax={5}
            id="standard-multiline-flexible"
            label="biography"
            value={userBio}
            onChange={(e) => setUserBio(e.target.value)}
          />

          <h2>Email</h2>
          <p>{email}</p>
          <h2>Study Groups</h2>
          {groups.map((group) => (
            <p key={group.id}>{group}</p>
          ))}
        </div>
        <div className="profileButtonContainer">
          <ThemeProvider theme={theme1}>
            <Button
              className="profileButton"
              variant="contained"
              color="primary"
              aria-label="edit profile"
              name="edit"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </ThemeProvider>
        </div>
      </Container>
    </>
  );
};

export default Profile;
