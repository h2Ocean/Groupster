import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import widgets from '../Reusable/widgets';
import Rooms from './NavComponents/Rooms';

const GET_CHANNEL = gql`
  query getChannel($values: InputGetChannel!) {
    getChannel(values: $values) {
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

const NavSidebar = (props) => {
  const [name, setName] = useState('TESTINGLOBBY');
  const [currentChannel, setCurrentChannel] = useState();
  const strId = `${name}-123456`;
  const { data } = useQuery(GET_CHANNEL, {
    variables: {
      values: {
        strId,
        getAll: false,
      },
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
      {widgets.category('Sci')}
      {widgets.category('Hist')}
      {widgets.memberAvatar(
        'Erica',
        'https://drive.google.com/thumbnail?id=1BxhrkgT0ypUe2Dt-zD2-Kr8lvwel93ym',
      )}
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
      </div>
    </div>
  );
};

export default NavSidebar;
