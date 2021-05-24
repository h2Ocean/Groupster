/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
import io from 'socket.io-client';
import './styles/chat.css';
import { CardHeader } from '@material-ui/core';

let socket;
const CONNECTION_PORT = 'localhost:4000';
const GET_CHATS = gql`
  query {
    getChats {
      id
      name
      nick
      msg
      created
    }
  }
`;
const Chat = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState('lobby');

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [{ client }] = useState(props);
  const { data } = useQuery(GET_CHATS);
  // user info
  const [{ username }] = useState(props);
  const [{ nick }] = useState(props);

  const dummy = useRef();

  useEffect(() => {
    if (data) {
      const arr = data.getChats.map(({ name, msg }) => ({
        room,
        content: {
          username: name,
          message: msg,
        },
      }));
      setMessageList([...messageList, arr]);
    }
  }, [data]);

  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit('join', room);
  };

  // establish connection
  useEffect(() => {
    socket = io(CONNECTION_PORT);
    connectToRoom();
  }, [CONNECTION_PORT]);

  // handle message recieved
  useEffect(() => {
    socket.on('receive_message', (res) => {
      setMessageList([...messageList, res]);
    });
  });

  // handle login

  const sendMessage = async () => {
    if (message.length > 0) {
      const messageContent = {
        room,
        content: {
          username,
          message,
        },
      };

      await socket.emit('send_message', messageContent);
      setMessageList([...messageList, messageContent.content]);
      setMessage('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const populate = () => {
    if (messageList[0]) {
      return messageList[0].map(({ content }, key) => (
        <div
          className="messageContainer"
          key={key}
          id={content.username === username ? 'You' : 'Other'}
          ref={dummy}
        >
          <div className="messageIndividual">{`${content.username}: ${content.message}`}</div>
        </div>
      ));
    }
    return <></>;
  };

  return (
    <div className="Chat">
      <div className="chatContainer">
        <div className="messages">{populate()}</div>
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
