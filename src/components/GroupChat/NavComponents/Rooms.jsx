import React, { useState, useEffect } from 'react';
import Room from './components/Room';

const Rooms = (props) => {
  const [{ rooms }] = useState(props);
  const [{ strId }] = useState(props);
  const [{ setRoom }] = useState(props);
  const [roomList, setRoomList] = useState([]);
  useEffect(() => {
    if (rooms.length > 0) {
      const arr = rooms.map((room) => <Room strId={strId} setRoom={setRoom} room={room} />);
      setRoomList([...roomList, arr]);
    }
  }, [rooms]);

  return (
    <div id="navBarWidget">
      <div className="heading">Channels</div>
      {roomList}
    </div>
  );
};

export default Rooms;
