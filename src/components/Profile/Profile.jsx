/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
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

const Profile = () => {
  const [isLoggd, setIsLogged] = useState([]);
  const [name, setName] = useState('Travis Wheaton');
  const [username] = useState('twheaton53');
  const [bio, setBio] = useState(biography);
  let userEmail;
  const [email] = useState('tjwheaton53@gmail.com');
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
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (!edit) {
    return (
      <Container className="Profile">
        <h1>Profile Page</h1>
        <h2>Full Name:&nbsp;</h2>
        <p>{name}</p>
        <h2>Username:&nbsp;</h2>
        <p>{username}</p>
        <h2>Biography</h2>
        <p>{bio}</p>
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
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h2>Username:&nbsp;</h2>
      <p>{username}</p>
      <h2>Biography</h2>
      <TextField
        name="biography"
        variant="outlined"
        fullWidth
        multiline
        rowsMax={5}
        id="standard-multiline-flexible"
        label="biography"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
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
