import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="col col-sm-4">
      <input
        type="search"
        name="search"
        className="form-control"
        placeholder="Type to search.."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBox;
