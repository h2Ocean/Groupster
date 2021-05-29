import React, { useState, useEffect } from 'react';
// import Chat from './Chat/Chat';

const MessageWindow = (props) => {
  const [{ user }] = useState(props);
  const [{ room }] = useState(props);
  useEffect(() => {
    console.log('please just work', room);
  }, [room]);
  return <div id="MessageWindow">{/* <Chat key={room} room={room} user={user} /> */}</div>;
};
export default MessageWindow;
