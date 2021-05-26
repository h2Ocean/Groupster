/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
<<<<<<< HEAD
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import LoginSignup from './login-signup/LoginSignup';
// import GroupChat from './GroupChat/GroupChat';
// import NavTopbar from './NavTopbar/NavTopbar';
import Dashboard from './Dashboard/Dashboard';
import './App.css';
// import Explore from './Explore/Explore';
=======
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import LoginSignup from './login-signup/LoginSignup';
import Signup from './login-signup/SignUp';
import Login from './login-signup/Login';
import GroupChat from './GroupChat/GroupChat';
import NavTopbar from './NavTopbar/NavTopbar';
import Dashboard from './Dashboard/Dashboard';
import './App.css';
import { AuthProvider } from '../contexts/AuthContent';
import Explore from './Explore/Explore';
>>>>>>> 7de77ae7590f66892da8ac8795bf69605ef28bfd

const App = () => {
  const [username, setUsername] = useState('tobiasaf');
  // const [nick, setNick] = useState('tobias');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const [categories, setCategories] = useState([]);
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
          <Router>
            <AuthProvider>
              <ApolloProvider client={client}>
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                </Switch>
              </ApolloProvider>
            </AuthProvider>
          </Router>
        </div>
      );
    }

    return (
      <div style={{ margin: 'auto' }}>
        {/* <Explore categories={categories} setCategories={setCategories} /> */}
        <ApolloProvider client={client}>
          {/* <GroupChat nick={nick} username={username} client={client} /> */}
          <Dashboard />
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

/* <LoginSignup
setUsername={setUsername}
setIsLoggedIn={setIsLoggedIn}
isLoggedIn={isLoggedIn}
/> */
