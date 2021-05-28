import React, { useState } from 'react';
import Chat from './Chat/Chat';

const MessageWindow = (props) => {
  const [{ user }] = useState(props);
  const [{ room }] = useState(props);

  return (
    <div id="MessageWindow">
      <Chat room={room} user={user} />
    </div>
  );
};
export default MessageWindow;
