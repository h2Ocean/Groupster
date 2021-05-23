import React from 'react';
import SearchChat from './SearchChat';
import WriteMessage from './WriteMessage';

const MessageWindow = () => {
  return (
    <div id="MessageWindow" style={{ border: '1px solid purple' }}>
      <SearchChat />
      Hello to our members!
      <WriteMessage />
    </div>
  );
};
export default MessageWindow;
