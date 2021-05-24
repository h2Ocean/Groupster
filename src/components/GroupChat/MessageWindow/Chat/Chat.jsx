/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './styles/chat.css';

let socket;
const CONNECTION_PORT = 'localhost:4000';

const Chat = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState('lobby');
  const [{ username }] = useState(props);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const dummy = useRef();

  // establish connection
  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  // handle message recieved
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList([...messageList, data]);
    });
  });

  // handle login
  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit('join', room);
  };

  const sendMessage = async () => {
    if (message.length > 0) {
      const messageContent = {
        room,
        content: {
          author: username,
          message,
        },
      };

      await socket.emit('send_message', messageContent);
      setMessageList([...messageList, messageContent.content]);
      setMessage('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="Chat">
      <div className="chatContainer">
        <div className="messages">
          {messageList.map((val, key) => (
            <div
              className="messageContainer"
              key={key}
              id={val.author === username ? 'You' : 'Other'}
              ref={dummy}
            >
              <div className="messageIndividual">{`${val.author}: ${val.message}`}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="messageInputs">
        <input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button type="submit" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
