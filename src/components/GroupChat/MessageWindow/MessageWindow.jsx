import React, { useState } from 'react';
import Chat from './Chat/Chat';

const MessageWindow = (props) => {
  const [{ user }] = useState(props);
  return (
    <div id="MessageWindow">
      <Chat user={user} />
    </div>
  );
};
export default MessageWindow;
