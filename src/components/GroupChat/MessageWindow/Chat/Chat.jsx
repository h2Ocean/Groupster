/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import io from 'socket.io-client';
import './styles/chat.css';

let socket;
const CONNECTION_PORT = 'localhost:4000';
const GET_CHATS = gql`
  query GetChats($room: String!) {
    getChats(room: $room) {
      id
      name
      msg
      created
      room
    }
  }
`;

const SEND_CHATS = gql`
  mutation SendMessage($message: InputMessage!) {
    sendMessage(message: $message) {
      id
      name
      msg
      created
      room
    }
  }
`;

const Chat = (props) => {
  const [{ room }] = useState(props);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [messageContentList, setMessageContentList] = useState([]);
  const { data } = useQuery(GET_CHATS, {
    variables: {
      room,
    },
  });
  const [sendChat] = useMutation(SEND_CHATS);
  const [{ user }] = useState(props);
  const { username } = user.getProfile[0];
  const dummy = useRef();

  useEffect(() => {
    if (data) {
      const arr = data.getChats.map(({ name, msg }) => ({
        room,
        content: {
          username: name,
          message: msg,
          room,
        },
      }));
      setMessageList([...messageList, ...arr]);
    }
  }, [data]);

  const connectToRoom = () => {
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
      console.log(res);
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
          room,
        },
      };
      console.log(messageContent);
      await socket.emit('send_message', messageContent);
      setMessageList([...messageList, messageContent]);
      setMessage('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
      sendChat({
        variables: {
          message: {
            name: username,
            msg: message,
            room,
          },
        },
      });
    }
  };

  const populate = () => {
    if (messageList) {
      setMessageContentList([
        messageList.map(({ content }, key) => (
          <div
            className="messageContainer"
            key={key}
            id={content.username === username ? 'You' : 'Other'}
            ref={dummy}
          >
            <div className="messageIndividual">{`${content.username}: ${content.message}`}</div>
          </div>
        )),
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    populate();
  }, [messageList]);

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageContentList]);

  return (
    <div className="Chat">
      <div className="chatContainer">
        <div className="messages">{messageContentList}</div>
      </div>
      <div className="messageInputs">
        <input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyPress={handleKeyDown}
        />
        {/* the entire code breaks unless you have this invisible button */}
        <button style={{ display: 'none' }} type="submit" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
