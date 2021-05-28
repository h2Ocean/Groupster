import React, { useState, useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { auth } from '../../firebase';
import NavTopbar from '../NavTopbar/NavTopbar';
import Chat from './Chat/Chat';
import NavSidebar from './NavSidebar';
import Members from './Members';
import './GroupChat.css';

const GET_USER = gql`
  query getProfile($email: String!) {
    getProfile(email: $email) {
      id
      email
      username
      name
      age
    }
  }
`;
const GroupChat = () => {
  const [isLogged, setIsLogged] = useState([]);
  const [enviroment, setEnviroment] = useState([]);
  let userEmail;
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
  }, []);

  const populate = () => (
    <>
      <CssBaseline />
      <NavTopbar />
      <div id="GroupChat_container">
        <NavSidebar />
        <Chat user={data} />
        <Members />
      </div>
    </>
  );

  useEffect(() => {
    if (isLogged.length === 0 && data) {
      setEnviroment(populate());
    }
  }, [data]);

  return (
    <>
      {isLogged}
      {enviroment}
    </>
  );
};

export default GroupChat;
