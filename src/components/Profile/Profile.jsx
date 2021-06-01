/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import NotificationManager from 'react-notifications';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Container, TextField, Button, Paper, Divider, IconButton } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { auth, storage } from '../../firebase';
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
      pfp
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  header: {
    width: '80vw',
    borderBottom: '2px solid #7E6ECB',
    padding: '10px',
  },
  names: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    marginRight: '10px',
  },
  paper: {
    padding: '15px',
    display: 'inline-block',
    border: '1px solid lightGrey',
    marginRight: '40px',
  },
  divider: {
    background: '#7E6ECB',
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  pfp: {
    width: '300px',
    height: '300px',
    objectFit: 'cover',
  },
}));

const UPDATE_USER = gql`
  mutation updateBio($info: UpdateBio!) {
    updateBio(info: $info) {
      name
      email
      bio
      pfp
    }
  }
`;

const Profile = () => {
  const maxSize = 5242880;
  const [isLogged, setIsLogged] = useState([]);
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState(
    'https://firebasestorage.googleapis.com/v0/b/groupster-befe4.appspot.com/o/images%2FIMG_3909_50.jpg?alt=media&token=25a81788-e22e-4e64-9c3b-733c2f47affa',
  );
  const [userBio, setUserBio] = useState('');
  const [picFile, setPicFile] = useState('');
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
      setProfilePic(data.getProfile[0].pfp);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      variables: {
        info: {
          name: fullName,
          email,
          bio: userBio,
          pfp: profilePic,
        },
      },
    });
    setEdit(false);
  };

  const bytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${Math.round(bytes / (1024, i) ** 2)} ${sizes[i]}`;
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (file.size < maxSize) {
      const uploadTask = storage.ref(`groupster/${file.name}`).put(file);

      uploadTask.on(
        'state_changed',
        () => {},
        (error) => {
          throw new Error(error);
        },
        () => {
          storage
            .ref('groupster')
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              updateProfile({
                variables: {
                  info: {
                    name: fullName,
                    email,
                    bio: userBio,
                    pfp: url,
                  },
                },
              });
              setProfilePic(url);
            });
        },
      );
    } else {
      NotificationManager.error(`Max file size is 5mb, yours is ${bytesToSize(file.size)}`);
    }
  };

  if (!edit) {
    return (
      <>
        {console.log(profilePic)}
        <NavTopbar showSearchbar="false" />
        <Container className="Profile">
          <h1 className={classes.header}>Profile Page</h1>
          <div className="profilePageBody">
            <Paper className={classes.paper} elevation="1">
              <img src={profilePic} alt="profilePhoto" className={classes.pfp} />
            </Paper>
            <div style={{ display: 'inline-block', height: '100%' }}>
              <div className={classes.names}>
                <h2 className="headerName">Full Name&nbsp;</h2>
                <span className="entry">{fullName}</span>
              </div>
              <div className={classes.names}>
                <h2 className="headerName">Username&nbsp;</h2>
                <span className="entry">{userName}</span>
              </div>
              <div className={classes.names}>
                <h2 className="headerName">Email</h2>
                <p className="entry">{email}</p>
              </div>
            </div>
            <h2>Biography</h2>
            <p>{userBio}</p>
            <h2>Study Groups</h2>
            {groups.map((group) => (
              <p key={group.id}>{group}</p>
            ))}
          </div>
          <ThemeProvider theme={theme1}>
            <Divider variant="middle" className={classes.divider} />
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
        <div className="profilePageBody">
          <Paper className={classes.paper} elevation="1">
            <img className={classes.pfp} src={profilePic} alt="profilePhoto" />
          </Paper>
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
          <div className={classes.root}>
            Profile&nbsp;Picture
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleUploadClick}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>
            </label>
          </div>
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
