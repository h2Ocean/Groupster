import React, { useState } from 'react';

const Search = () => {
  const [word, setSearchWord] = useState('');
  return (
    <div id="searchChat">
      <input
        type="text"
        size="sm"
        onChange={(e) => setSearchWord(e.target.value)}
      />
      <span
        className="material-icons searchIcon"
        style={{ position: 'relative', left: '-20px' }}
      >
        search
      </span>
    </div>
  );
};

export default Search;
