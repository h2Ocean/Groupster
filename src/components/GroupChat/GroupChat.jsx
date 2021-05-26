import React, { useState } from 'react';
import NavTopbar from '../NavTopbar/NavTopbar';
import MessageWindow from './MessageWindow/MessageWindow';
import NavSidebar from './NavSidebar';
import Members from './Members';
import './GroupChat.css';

const GroupChat = () => {
  const [username] = useState('tobiasaf');
  const [nick] = useState('Tobias');

  return (
    <fragment>
      <NavTopbar />
      <div id="GroupChat_container">
        <NavSidebar />
        <MessageWindow nick={nick} username={username} />
        <Members />
      </div>
    </fragment>
  );
};

export default GroupChat;
