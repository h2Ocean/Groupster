import React, { useState } from 'react';
import LoginSignup from './login-signup/LoginSignup';
import GroupChat from './GroupChat/GroupChat';
import NavTopbar from './NavTopbar/NavTopbar';
import './App.css';
import Explore from './Explore/Explore';

const App = () => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
    // <Chat username={username} />

    return (
      <fragment style={{ margin: 'auto' }}>
        <Explore className="container" />
        {/* <NavTopbar />
        <GroupChat /> */}
      </fragment>
    );
  };

  return <div className="App">{populate()}</div>;
};

export default App;
