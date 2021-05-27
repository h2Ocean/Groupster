import React, { useState } from 'react';

const Search = () => {
  const [word, setSearchWord] = useState('');
  return (
    <div id="searchChat">
      <input
        type="text"
        style={{
          fontSize: '14px',
          borderRadius: '10px',
          border: 'none',
          textIndent: '10px',
          color: '#484848',
          lineHeight: '20px',
          backgroundColor: '#DEF7EB',
        }}
        onChange={(e) => setSearchWord(e.target.value)}
      />
      <span className="material-icons searchIcon" style={{ position: 'relative', left: '-20px' }}>
        search
      </span>
    </div>
  );
};

export default Search;
