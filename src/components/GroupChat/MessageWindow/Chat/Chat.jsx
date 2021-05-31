/* eslint-disable no-alert */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import io from 'socket.io-client';
import { useDropzone } from 'react-dropzone';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FileViewer from 'react-file-viewer';
import './styles/chat.css';
import { auth, storage } from '../../../../firebase';

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

const GET_USER = gql`
  query getProfile($email: String!) {
    getProfile(email: $email) {
      id
      email
      username
      name
      age
    }
  }
`;

const Chat = (props) => {
  const [{ room }] = useState(props);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [messageContentList, setMessageContentList] = useState([]);
  const [sendChat] = useMutation(SEND_CHATS);
  const [username, setUsername] = useState('');
  const [hasFile, setHasFile] = useState(false);
  const [file, setFile] = useState({});
  const [placeholder, setPlaceholder] = useState('Message...');
  const dummy = useRef();
  const onDrop = useCallback((files) => {
    setFile({
      file: files[0],
      type: files[0].name.substr(files[0].name.indexOf('.')),
      name: files[0].name,
    });
    setHasFile(true);
    setPlaceholder('');
  }, []);

  const userEmail = auth.currentUser.email;
  const { data } = useQuery(GET_USER, {
    variables: {
      email: userEmail,
    },
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const { ref, ...rootProps } = getRootProps();

  const chats = useQuery(GET_CHATS, {
    variables: {
      room,
    },
  });

  useEffect(() => {
    if (data) {
      setUsername(data.getProfile[0].username);
    }
  }, [data]);

  useEffect(() => {
    if (chats.data) {
      const arr = chats.data.getChats.map(({ name, msg }) => ({
        room,
        content: {
          username: name,
          message: msg,
          room,
        },
      }));
      setMessageList([...arr]);
    }
  }, [chats.data]);

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
      setMessageList([...messageList, res]);
    });
  });

  // handle login

  const sendMessage = async () => {
    if (username.length > 0) {
      if (message.length > 0) {
        const messageContent = {
          room,
          content: {
            username,
            message,
            room,
          },
        };
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
    } else {
      alert('Username is not set. Please try to relogin');
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

  const handleUpload = (upload) => {};

  const uploadFile = () => {
    let path;
    const uploadTask = storage.ref(`groupster/${file.name}`).put(file.file);
    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        throw new Error(error);
      },
      () => {
        storage
          .ref('groupster')
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            path = url;
          });
      },
    );
  };

  useEffect(() => {
    if (file.length > 0) uploadFile();
  }, [file]);

  const handleClear = () => {
    setHasFile(false);
    setPlaceholder('Message...');
    setFile({});
  };

  return (
    <div className="Chat">
      <div className="chatContainer">
        <div className="messages">{messageContentList}</div>
      </div>
      <div className="messageInputs">
        <Input
          className="chatInput"
          type="text"
          placeholder={placeholder}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          style={{ color: '#757575' }}
          onKeyPress={handleKeyDown}
          endAdornment={
            <div>
              <InputAdornment position="end" {...rootProps}>
                <input type="submit" {...getInputProps()} />
                <AddIcon className="file-upload" tyle={{ color: '#757575' }} />
              </InputAdornment>
            </div>
          }
          startAdornment={
            hasFile ? (
              <Paper
                style={{
                  maxWidth: '40vw',
                  marginRight: '10px',
                  padding: '.8vh 3px .8vh 3px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  backgroundColor: '#757575',
                  color: '#d2d4da',
                }}
              >
                <div style={{ marginTop: '2px' }}>{file.name}</div>
                <Grid container justify="flex-end" alignItems="flex-end">
                  <IconButton
                    onClick={handleClear}
                    style={{ marginRight: '1px', height: '1vh', width: '1vw' }}
                  >
                    <ClearIcon style={{ float: 'right' }} />
                  </IconButton>
                </Grid>
              </Paper>
            ) : (
              <></>
            )
          }
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
