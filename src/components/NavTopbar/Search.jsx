import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { sizing } from '@material-ui/system';

const Search = () => {
  const [word, setSearchWord] = useState('');
  return (
    <div id="searchChat">
      <TextField
        id="outlined-search"
        color="primary"
        size="small"
        label="Search Chat"
        type="search"
        variant="outlined"
      />
      <input
        type="search"
        defaultValue="search in chat"
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
