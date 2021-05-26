import React, { useState } from 'react';
import Chat from './components/Chat';
import NavTopBar from '../NavTopbar/NavTopbar';
import NavSidebar from './components/NavSidebar';
import Members from './components/Members';
import './GroupChat.css';

const GroupChat = () => {
  const [username] = useState('tobiasaf');
  const [nick] = useState('Tobias');

  return (
    <div id="GroupChat_container">
      <NavTopBar />
      <NavSidebar />
      <Chat nick={nick} username={username} />
      <Members />
    </div>
  );
};

export default GroupChat;
