import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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

const NavSidebar = (props) => {
  const [name, setName] = useState('TESTINGLOBBY');
  const [currentChannel, setCurrentChannel] = useState();
  const [open, setOpen] = useState(false);
  const strId = `${name}-123456`;
  const { data } = useQuery(GET_CHANNEL, {
    variables: {
      strId,
    },
  });
  const [{ setRoom }] = useState(props);
  const [rooms, setRooms] = useState([]);
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

  return (
    <div id="NavSidebar" style={{ backgroundColor: '#E6E9EF' }}>
      <div className="navBarWidget">
        <div className="heading">Group</div>
        {widgets.groupWidget('Medieval History')}
      </div>
      <Rooms key={rooms} setRoom={setRoom} rooms={rooms} strId={strId} />
      {/* <div className="navBarWidget">
        <div className="heading">Voice Chat</div>
      </div> */}
      <div className="navBarWidget">
        <div className="heading">Resources</div>
        <div style={{ marginLeft: '15px', fontSize: '16px', textIndent: '10px' }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              area-controls="panella-content"
              id="panella-header"
            >
              Recent
            </AccordionSummary>
          </Accordion>
        </div>
        <button
          type="button"
          onClick={handleOpen}
          style={{ marginLeft: '15px', fontSize: '16px', border: 'none' }}
        >
          Show All
        </button>
        <div className="modalContainer">hello</div>
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
              <h2 id="transition-modal-title">Transition modal</h2>
              <p id="transition-modal-description">react-transition-group animates me.</p>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default NavSidebar;
