import React, { useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import LoginSignup from './login-signup/LoginSignup';
import GroupChat from './GroupChat/GroupChat';
import NavTopbar from './NavTopbar/NavTopbar';
import Dashboard from './Dashboard/Dashboard';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
  });
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  const populate = () => {
    if (!isLoggedIn) {
      return (
        <div>
          <h1>Hello, Learners!</h1>
          <LoginSignup
            setUsername={setUsername}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
          />
        </div>
      );
    }

    return (
      <div>
        <ApolloProvider client={client}>
          {/* <NavTopbar />
          <GroupChat username={username} client={client} /> */}
          {/* <Dashboard /> */}
        </ApolloProvider>
      </div>
    );
  };

  return <div className="App">{populate()}</div>;
};

export default App;
