import React, { useState } from 'react';
import axios from 'axios';

import {BASE_URL} from "./helper";

const App = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(endDate) <= new Date(startDate)) {
      setError('End date must be greater than start date');
      return;
    }

      const res = await axios.post(`${BASE_URL}/api/items`, { name, price, startDate, endDate});
      console.log(res.data);
  };

  return (
    <div>
      <h2>Enter Data</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="price">Price:</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <label htmlFor="startDate">Start Date:</label>
        <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />

        <label htmlFor="endDate">End Date:</label>
        <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

        {error && <p>{error}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
