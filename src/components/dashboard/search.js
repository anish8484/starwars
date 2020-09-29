import React from 'react';

const Search = (props) => (
    <div>
        <input type="text" placeholder="Search" value={props.searchTxt} onChange={e => props.handleSearch(e)} />
    </div>
);

export default Search;