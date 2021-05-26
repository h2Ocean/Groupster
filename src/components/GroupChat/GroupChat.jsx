import React, { useState } from 'react';
import NavTopbar from '../NavTopbar/NavTopbar';
import MessageWindow from './MessageWindow/MessageWindow';
import NavSidebar from './NavSidebar';
import Members from './Members';
import './GroupChat.css';

const GroupChat = (props) => {
  const [{ username }] = useState(props);
  const [{ client }] = useState(props);
  const [{ nick }] = useState(props);

  return (
    <fragment>
      <NavTopbar />
      <div id="GroupChat_container">
        <NavSidebar />
        <MessageWindow nick={nick} client={client} username={username} />
        <Members />
      </div>
    </fragment>
  );
};

export default GroupChat;
