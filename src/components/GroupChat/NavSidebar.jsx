/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-bitwise */
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Divider } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { v4 as uuidv4 } from 'uuid';
import widgets from '../Reusable/widgets';
import Rooms from './NavComponents/Rooms';

const useStyles = makeStyles((theme) => ({
  divider: {
    color: 'red',
  },
}));

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

  const [{ setRoom, room, resource, resourceName }] = useState(props);
  const [rooms, setRooms] = useState([]);
  const resourceList = [];
  const classes = useStyles();


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
  useEffect(() => {
    if (resourceName.length > 0) {
      resourceName.forEach((resrc, ind) => {
        resourceList.push({
          name: resrc[ind],
          linke: resource[ind],
        });
      });
    }
  });

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
        <div style={{ marginLeft: '15px', fontSize: '16px', textIndent: '10px' }}>
          {resource.map((ea, ind) => (
            <a href={`${resource[ind]}`}>`${ind}`</a>
          ))}
        </div>
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
              {resourceList.map((ea, ind) => (
                <a href={`${ea.link}`}>`${ea.name}`</a>
              ))}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  padding: '20px',
                }}
              >
                <Divider className={classes.divider} />
                <div className="rsc">
                  <a
                    type="button"
                    href="https://firebasestorage.googleapis.com/v0/b/groupster-befe4.appspot.com/o/groupster%2F12493824_761156884019250_8719775955904428240_o.jpg?alt=media&token=6377c875-a6ae-47a1-b56d-b3a5d66fc8c2"
                  >
                    <span>12493824_761156884019250_8719775955904428240_o.jpg</span>
                  </a>
                </div>
                <Divider className={classes.divider} />
                <div className="rsc">
                  <a
                    type="button"
                    href="https://firebasestorage.googleapis.com/v0/b/groupster-befe4.appspot.com/o/groupster%2Ftobias_fischer_resume.docx?alt=media&token=4ecf5561-b043-4602-9cc3-b97cece89acd"
                  >
                    <span>tobias_fischer_resume.docx</span>
                  </a>
                </div>
                <Divider className={classes.divider} />
                <div className="rsc">
                  <a
                    type="button"
                    href="https://firebasestorage.googleapis.com/v0/b/groupster-befe4.appspot.com/o/groupster%2FExercise_%20An%20Introduction%20to%20SQL.pdf?alt=media&token=9838b678-4685-4723-b180-733ace9d4061"
                  >
                    <span>Exercise_ An Introduction to SQL.pdf</span>
                  </a>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default NavSidebar;
