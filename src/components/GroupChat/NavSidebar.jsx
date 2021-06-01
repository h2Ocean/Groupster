/* eslint-disable no-bitwise */
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
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
        email
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
  const strId = `${name}-${stringToHash(name)}`;
  const { data } = useQuery(GET_CHANNEL, {
    variables: {
      strId,
    },
  });
  const [{ setRoom }] = useState(props);
  const [rooms, setRooms] = useState([]);

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
      <h5>{`Room code: ${strId}`}</h5>
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
        <div style={{ marginLeft: '15px', fontSize: '16px', textIndent: '10px' }}>
          Resource Upload
        </div>
      </div>
    </div>
  );
};

export default NavSidebar;
