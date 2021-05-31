/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';

const Room = (props) => {
  const [{ strId }] = useState(props);
  const [{ room }] = useState(props);
  const [{ setRoom }] = useState(props);
  const [{ currentRoom }] = useState(props);

  const handleClick = () => {
    setRoom(`${strId}-${room}`);
  };

  return (
    <>
      <div
        className="channel"
        onClick={handleClick}
        style={{ backgroundColor: currentRoom.slice(20) === room ? '#9fe5c3' : null }}
      >
        {room}
      </div>
    </>
  );
};

export default Room;
