import React, { useState } from 'react';
import axios from 'axios';
import sampleData from '../../../server/rideSamples.js';

function Main() {
  const [searchTerm, setSearchTerm] = useState({});

  const updateSearch = (e) => {
    const { value } = e.target;
    const name = e.target.getAttribute('name');
    if (name === 'From') {
      setSearchTerm({ ...searchTerm, source: value.toLowerCase() });
    } else if (name === 'Destination') {
      setSearchTerm({ ...searchTerm, destination: value.toLowerCase() });
    }
  };

  const searchRides = async (e) => {
    e.preventDefault();
    console.log(searchTerm);
    axios.get('/rides', { params: { search: searchTerm } });
  };

  return (
    <div>
      <form onSubmit={searchRides}>
        <input
          type="text"
          name="From"
          placeholder="From"
          onChange={updateSearch}
        />
        <input
          type="text"
          name="Destination"
          placeholder="Destination"
          onChange={updateSearch}
        />
        <button type="submit" onClick={searchRides}>
          {' '}
          Go!
          {' '}
        </button>
      </form>
    </div>
  );
}

export default Main;
