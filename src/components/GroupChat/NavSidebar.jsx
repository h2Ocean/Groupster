import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
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

const NavSidebar = (props) => {
  const [name, setName] = useState('TESTINGLOBBY');
  const [currentChannel, setCurrentChannel] = useState();
  const strId = `${name}-123456`;
  const { loading, error, data } = useQuery(GET_CHANNEL, {
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
      <svg style={{ width: '50px', height: '50px', color: 'purple' }} type="image/svg+xml">
        <iframe
          title="art"
          src="https://drive.google.com/thumbnail?id=1ElU9W2TszJl4YDJ_AzB3-HBhIGeTJNcW"
          alt="Art Icon"
          style={{ height: '50px' }}
        />
      </svg>

      {widgets.category('Sci')}
      {widgets.category('Hist')}
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
