/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './styles/chat.css';

let socket;
const CONNECTION_PORT = 'localhost:4000';

const Chat = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState('lobby');
  const [username, setUsername] = useState('tobiasaf');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

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
    }
  };

  return (
    <div className="Chat">
      {!loggedIn ? (
        <div className="logIn">
          <div className="inputs">
            <input
              type="text"
              placeholder="Name..."
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room..."
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <button type="submit" onClick={connectToRoom}>
            Enter Chat
          </button>
        </div>
      ) : (
        <div className="chatContainer">
          <div className="messages">
            {messageList.map((val, key) => (
              <div
                className="messageContainer"
                key={key}
                id={val.author === username ? 'You' : 'Other'}
              >
                <div className="messageIndividual">{`${val.author}: ${val.message}`}</div>
              </div>
            ))}
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
      )}
    </div>
  );
};

export default Chat;
