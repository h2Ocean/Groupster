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
const GroupChat = (props) => {
  const [{ client }] = useState(props);
  const [isLogged, setIsLogged] = useState([]);
  const [enviroment, setEnviroment] = useState([]);
  const [room, setRoom] = useState('TESTINGLOBBY-123456-lobby');
  const [group, setGroup] = useState('Medieval History');
  const [resource, setResource] = useState([]);
  const [resourceName, setResourceName] = useState([]);
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
  }, [room]);

  return (
    <div>
      {isLogged}
      <CssBaseline />
      <NavTopbar title="Chat" showSearchbar="false" crumbs={[`${group}`, `${room.slice(20)}`]} />
      <div id="GroupChat_container">
        <NavSidebar setRoom={setRoom} room={room} resource={resource} resourceName={resourceName} />
        <Chat
          key={room}
          client={client}
          room={room}
          user={data}
          resource={resource}
          setResource={setResource}
          resourceName={resourceName}
          setResourceName={setResourceName}
        />
        <Members />
      </div>
    </div>
  );
};

export default GroupChat;
