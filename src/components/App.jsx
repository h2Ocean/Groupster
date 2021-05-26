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
import Explore from './Explore/Explore';

const App = () => {
  const [username, setUsername] = useState('tobiasaf');
  const [nick, setNick] = useState('tobias');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [categories, setCategories] = useState([]);
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
      <div id="mainDisplay">
        {/* <Explore categories={categories} setCategories={setCategories} /> */}
        <NavTopbar />
        <ApolloProvider client={client}>
          <GroupChat nick={nick} username={username} client={client} />
        </ApolloProvider>
      </div>
    );
  };

  return (
    <div className="App" style={{ margin: 'auto' }}>
      {populate()}
    </div>
  );
};

export default App;
