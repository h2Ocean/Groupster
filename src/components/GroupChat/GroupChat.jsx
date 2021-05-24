import React, { useState } from 'react';
import MessageWindow from './MessageWindow/MessageWindow';
import NavSidebar from './NavSidebar';
import Members from './Members';
import './GroupChat.css';

const GroupChat = (props) => {
  const [{ username }] = useState(props);
  return (
    <div id="GroupChat_container">
      <NavSidebar />
      <MessageWindow username={username} />
      <Members />
    </div>
  );
};

export default GroupChat;
