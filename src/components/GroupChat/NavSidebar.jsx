/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-bitwise */
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Modal, Backdrop, Fade, Divider } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { v4 as uuidv4 } from 'uuid';
import widgets from '../Reusable/widgets';
import Rooms from './NavComponents/Rooms';

const GET_CHANNEL = gql`
  query getChannel($strId: String!) {
    getChannel(strId: $strId) {
      id
      strId
      name
      category
      admin {
        id
        username
        name
        age
      }
      users {
        id
        email
        username
        name
        age
      }
      rooms
    }
  }
`;

const stringToHash = (string) => {
  let hash = 0;

  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i += 1) {
    const char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash;
  }

  return hash;
};

const NavSidebar = (props) => {
  const [name, setName] = useState('Lobby');
  const [currentChannel, setCurrentChannel] = useState();
  const [open, setOpen] = useState(false);
  const strId = `${name}-${stringToHash(name)}`;
  const { data } = useQuery(GET_CHANNEL, {
    variables: {
      strId,
    },
  });

  const [{ setRoom, room, resource }] = useState(props);
  const [rooms, setRooms] = useState([]);

  // const [chats, setChats] = useState([]);

  // const { data1 } = useQuery(GET_CHATS_FOR_ROOM, {
  //   variables: {
  //     room,
  //   },
  // });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (data) {
      setCurrentChannel(data.getChannel);
    }
  }, [data]);

  useEffect(() => {
    if (currentChannel) {
      setRooms(currentChannel.rooms);
    }
  }, [currentChannel]);
  let result = [];
  return (
    <div id="NavSidebar" style={{ backgroundColor: '#E6E9EF' }}>
      <div
        style={{
          padding: '2vw',
          fontWeight: '700',
          borderRadius: '15px',
          fontSize: '16px',
          fontFamily: 'quicksand',
        }}
      >
        <div>Room code:</div>
        {`${strId}`}
      </div>
      <div className="navBarWidget">
        <div className="heading">Group</div>
        {widgets.groupWidget('Medieval History')}
      </div>
      <Rooms key={rooms} setRoom={setRoom} rooms={rooms} strId={strId} />

      <div className="navBarWidget">
        <div className="heading">Resources</div>
        <div
          style={{
            marginLeft: '15px',
            fontSize: '16px',
            textIndent: '10px',
            display: 'flex',
            flexDirection: 'column',
          }}
        ></div>
        <button
          type="button"
          onClick={handleOpen}
          style={{ marginLeft: '15px', fontSize: '16px', border: 'none' }}
        >
          Show All
        </button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className="resourceModal">
              <h2 id="transition-modal-title">Resources</h2>
              Click to download
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  padding: '20px',
                }}
              >
                {props.resource.map((ea, ind) => (
                  <>
                    <Divider />
                    <div className="rsc">
                      <a type="button" href={`${ea.url}`}>
                        <span>{`${ea.name}`}</span>
                      </a>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default NavSidebar;
