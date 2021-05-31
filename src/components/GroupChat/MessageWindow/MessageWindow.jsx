import React, { useState, useEffect } from 'react';
import Chat from '../Chat/Chat';

const MessageWindow = (props) => {
  const [{ room }] = useState(props);

  return (
    <div id="MessageWindow">
      <Chat key={room} room={room} />
    </div>
  );
};
export default MessageWindow;
