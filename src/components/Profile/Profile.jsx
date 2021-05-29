/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { auth } from '../../firebase';
import biography from './dummydata.js';
import './Profile.css';

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
      <Container className="Profile">
        <h1>Profile Page</h1>
        <h2>Full Name:&nbsp;</h2>
        <p>{fullName}</p>
        <h2>Username:&nbsp;</h2>
        <p>{userName}</p>
        <h2>Biography</h2>
        <p>{userBio}</p>
        <h2>Email</h2>
        <p>{email}</p>
        <h2>Study Groups</h2>
        {groups.map((group) => (
          <p key={group.id}>{group}</p>
        ))}
        <Button aria-label="edit profile" name="edit" type="submit" onClick={() => setEdit(true)}>
          Edit Profile
        </Button>
      </Container>
    );
  }

  return (
    <Container className="Profile">
      <h1>Profile Page</h1>
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
        label="Biography"
        value={userBio}
        onChange={(e) => setUserBio(e.target.value)}
      />
      <h2>Email</h2>
      <p>{email}</p>
      <h2>Study Groups</h2>
      {groups.map((group) => (
        <p key={group.id}>{group}</p>
      ))}
      <Button aria-label="edit profile" name="edit" onClick={handleSubmit}>
        Save
      </Button>
    </Container>
  );
};

export default Profile;
