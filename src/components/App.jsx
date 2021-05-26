import React, { useState } from 'react';
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
          <Router>
            <AuthProvider>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
              </Switch>
            </AuthProvider>
          </Router>
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

/* <LoginSignup
setUsername={setUsername}
setIsLoggedIn={setIsLoggedIn}
isLoggedIn={isLoggedIn}
/> */
