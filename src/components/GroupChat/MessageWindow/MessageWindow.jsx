import React, { useState } from 'react';
import Chat from './Chat/Chat';

const MessageWindow = (props) => {
  const [{ nick }] = useState(props);
  const [{ username }] = useState(props);
  const [{ client }] = useState(props);

  return (
    <div id="MessageWindow">
      <Chat nick={nick} client={client} username={username} />
    </div>
  );
};
export default MessageWindow;
