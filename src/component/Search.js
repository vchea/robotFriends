import React from 'react';

const Search= ({ searchfield, searchChange }) => {
  return (
    <div className='pa2'>
      <input
        className='pa3 ba b--blue bg-light-green'
        type='search'
        placeholder='Search Robot'
        onChange={searchChange}
      />
    </div>
  );
}

export default Search;

