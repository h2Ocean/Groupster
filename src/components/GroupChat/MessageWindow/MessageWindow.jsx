import React, { useState } from 'react';
import Chat from './Chat/Chat';

const MessageWindow = (props) => {
  const [{ nick }] = useState(props);
  const [{ username }] = useState(props);
  const [{ client }] = useState(props);

  return (
    <div id="MessageWindow" style={{ border: '1px solid purple' }}>
      <Chat nick={nick} client={client} username={username} />
    </div>
  );
};
export default MessageWindow;
