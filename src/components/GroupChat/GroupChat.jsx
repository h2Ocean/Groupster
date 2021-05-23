import React from 'react';
import MessageWindow from './MessageWindow/MessageWindow';
import NavSidebar from './NavSidebar';
import Members from './Members';
import './GroupChat.css';

const GroupChat = () => {
  return (
    <div id="GroupChat_container">
      <NavSidebar />
      <MessageWindow />
      <Members />
    </div>
  );
};

export default GroupChat;
