/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './login-signup/SignUp';
import Login from './login-signup/Login';
import GroupChat from './GroupChat/GroupChat';
import Dashboard from './Dashboard/Dashboard';
import './App.css';
import { AuthProvider } from '../contexts/AuthContent';
import Explore from './Explore/Explore';

const App = () => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
  });
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <div className="App" style={{ margin: 'auto' }}>
      <div>
        <Router>
          <AuthProvider>
            <ApolloProvider client={client}>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/explore" component={Explore} />
                <Route path="/chat" component={GroupChat} />
              </Switch>
            </ApolloProvider>
          </AuthProvider>
        </Router>
      </div>
    </div>
  );
};

export default App;

/* <LoginSignup
setUsername={setUsername}
setIsLoggedIn={setIsLoggedIn}
isLoggedIn={isLoggedIn}
/> */
