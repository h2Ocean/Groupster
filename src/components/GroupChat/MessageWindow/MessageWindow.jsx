import React, { useState } from 'react';
import Chat from './Chat/Chat';

const MessageWindow = (props) => {
  const [{ username }] = useState(props);
  return (
    <div id="MessageWindow" style={{ border: '1px solid purple' }}>
      <Chat username={username} />
    </div>
  );
};
export default MessageWindow;
