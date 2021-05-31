/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './login-signup/SignUp';
import Login from './login-signup/Login';
import GroupChat from './GroupChat/GroupChat';
import Dashboard from './Dashboard/Dashboard';
import Profile from './Profile/Profile';
import './App.css';
import { AuthProvider } from '../contexts/AuthContent';
import Explore from './Explore/Explore';
import Welcome from './Welcome/Welcome';

const App = () => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
  });
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
  const [loggedIn, setLogin] = useState(false);

  return (
    <div className="App" style={{ margin: 'auto' }}>
      <Router>
        <AuthProvider>
          <ApolloProvider client={client}>
            <Switch>
              <Route path="/welcome" component={Welcome} />
              <Route exact path="/" component={Dashboard} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/explore" component={Explore} />
              <Route path="/chat" component={GroupChat} />
              <Route path="/profile" component={Profile} />
            </Switch>
          </ApolloProvider>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
