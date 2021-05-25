import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import LoginSignup from './login-signup/LoginSignup';
import GroupChat from './GroupChat/GroupChat';
import NavTopbar from './NavTopbar/NavTopbar';
import Dashboard from './Dashboard/Dashboard';
import './App.css';
import { AuthProvider } from '../contexts/AuthContent';

const App = () => {
  const [username, setUsername] = useState('tobiasaf');
  const [nick, setNick] = useState('tobias');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
          <AuthProvider>
            <LoginSignup
              setUsername={setUsername}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
            />
          </AuthProvider>
        </div>
      );
    }

    return (
      <div>
        <ApolloProvider client={client}>
          <GroupChat nick={nick} username={username} client={client} />
        </ApolloProvider>
      </div>
    );
  };

  return <div className="App">{populate()}</div>;
};

export default App;
