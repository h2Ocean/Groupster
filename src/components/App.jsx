import React from 'react';
import './App.css';
import GroupChat from './GroupChat/GroupChat';
import NavTopbar from './NavTopbar/NavTopbar';

const App = () => (
  <div className="App">
    <h1>Welcome to Groupify</h1>A place to learn, meet, grow together.
    <NavTopbar />
    <GroupChat />
  </div>
);

export default App;
