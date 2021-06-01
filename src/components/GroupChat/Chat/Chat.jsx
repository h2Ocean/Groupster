/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLazyQuery, useQuery, useMutation, gql } from '@apollo/client';
import io from 'socket.io-client';
import { useDropzone } from 'react-dropzone';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import FileViewer from 'react-file-viewer';
import { v4 as uuidv4 } from 'uuid';
import './styles/chat.css';
import { auth, storage } from '../../../firebase';
import 'react-notifications/lib/notifications.css';

const fileTypes = [
  '.apng',
  '.avif',
  '.gif',
  '.jpg',
  '.jpeg',
  '.jfif',
  '.pjpeg',
  '.pjp',
  '.png',
  '.svg',
  '.webp',
];
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
      file {
        name
        url
        isImage
        fileType
      }
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
      file {
        name
        url
        isImage
        fileType
      }
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
  const [username, setUsername] = useState('');
  const [hasFile, setHasFile] = useState(false);
  const [file, setFile] = useState({ name: null, url: null, isImage: null, fileType: null });
  const [fileToUpload, setFileToUpload] = useState({});
  const [placeholder, setPlaceholder] = useState('Message...');
  const maxSize = 5242880;
  const dummy = useRef();
  const [{ client }] = useState(props);
  const userEmail = auth.currentUser.email;
  const [prev, setPrev] = useState(-1);
  const user = useQuery(GET_USER, {
    variables: {
      email: userEmail,
    },
  });
  const chats = useQuery(GET_CHATS, {
    variables: {
      room,
    },
  });
  const [sendChat, { data }] = useMutation(SEND_CHATS, {
    update: (cache, mutationResult) => {
      const newChat = mutationResult.data.sendMessage;
      const cachedData = cache.readQuery({
        query: GET_CHATS,
        variables: { room },
      });
      cache.writeQuery({
        query: GET_CHATS,
        variables: { room },
        data: { Chat: newChat },
      });
    },
    optimisticResponse: {
      __typename: 'Mutation',
      sendMessage: {
        __typename: 'Chat',
        id: `This part we don't know yet but it will be a unique string so just to be safe ${uuidv4()}`,
        name: username,
        msg: message,
        room,
        created: uuidv4(),
        file: {},
      },
    },
  });

  const bytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${Math.round(bytes / (1024, i) ** 2)} ${sizes[i]}`;
  };

  const onDrop = useCallback((files) => {
    if (files[0].size < maxSize) {
      setFileToUpload({
        file: files[0],
        fileType: files[0].name.substr(files[0].name.indexOf('.')),
        name: files[0].name,
      });
      setHasFile(true);
      setPlaceholder('');
    } else {
      NotificationManager.error(`Max file size is 5mb, yours is ${bytesToSize(files[0].size)}`);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const { ref, ...rootProps } = getRootProps();
  const [{ resource, setResource, resourceName, setResourceName }] = useState(props);

  useEffect(() => {
    if (user.data) {
      setUsername(user.data.getProfile[0].username);
    }
  }, [user.data]);

  useEffect(() => {
    if (chats.data) {
      if (prev !== Object.keys(client.cache.data.data).length) {
        chats.refetch();
        setPrev(Object.keys(client.cache.data.data).length);
      }
      const arr = chats.data.getChats.map(({ name, msg, file }) => ({
        room,
        content: {
          username: name,
          message: msg,
          room,
          file,
        },
      }));
      setMessageList([...arr]);
    }
  }, [chats]);

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
  useEffect(() => {
    // eslint-disable-next-line consistent-return
    messageList.forEach((message) => {
      if (message.content.file.name) {
        setResource((prev) => [...prev, message.content.file.url]);
        setResourceName((prev) => [...prev, message.content.file.name]);
      }
    });
  }, [messageList]);

  const handleClear = () => {
    setHasFile(false);
    setPlaceholder('Message...');
  };

  const handleUpload = (url, { name, fileType }) => {
    setFile({
      name,
      url,
      isImage: fileTypes.includes(fileType.toLowerCase()),
      fileType,
    });
  };

  const uploadFile = () => {
    handleClear();
    const uploadTask = storage.ref(`groupster/${fileToUpload.name}`).put(fileToUpload.file);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        () => {},
        (error) => {
          reject(error);
        },
        () =>
          storage
            .ref('groupster')
            .child(fileToUpload.name)
            .getDownloadURL()
            .then((url) => {
              handleUpload(url, fileToUpload);
              resolve(url);
            }),
      );
    });
  };

  const sendMessage = async () => {
    if (username.length > 0) {
      if (fileToUpload.name) {
        uploadFile().then(async (url) => {
          const messageContent = {
            room,
            content: {
              username,
              message,
              room,
              file: {
                url,
                name: fileToUpload.name,
                fileType: fileToUpload.fileType,
                isImage: fileTypes.includes(fileToUpload.fileType.toLowerCase()),
              },
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
                file: {
                  url,
                  name: fileToUpload.name,
                  fileType: fileToUpload.fileType,
                  isImage: fileTypes.includes(fileToUpload.fileType.toLowerCase()),
                },
              },
            },
          });
          setFile({ name: null, url: null, isImage: null, fileType: null });
        });
      } else if (message.length > 0) {
        const messageContent = {
          room,
          content: {
            username,
            message,
            room,
            file,
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
              file,
            },
          },
        });
      }
    } else {
      alert('Username is not set. Please try to relogin');
    }
  };

  const checkFile = ({ file }) => {
    if (file.name !== null) {
      if (file.isImage) {
        return (
          <img
            style={{ width: '20vw', maxHeight: '50vh', objectFit: 'cover' }}
            src={file.url}
            alt={file.name}
          />
        );
      }
      return <a href={file.url}>{file.name}</a>;
    }
    return <></>;
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
            <div className="messageIndividual">
              {`${content.username}: `}
              <br />
              {checkFile(content)}
              {content.message}
            </div>
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
      dummy.current.scrollIntoView();
    }
  }, [messageContentList]);

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
                <div style={{ marginTop: '2px' }}>{fileToUpload.name}</div>
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
        <button id="msgSendButton" type="submit" onClick={sendMessage}>
          Send
        </button>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Chat;
