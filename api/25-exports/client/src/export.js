import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import axios from 'axios';

const ExportButton = () => {
  const [mockData, setMockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const res = await axios.get('/api/items');
        setMockData(res.data);
    };

    fetchData();
  }, []);

  const csvData = mockData.map((value) => ({
    name: value.name,
    address: value.address.street,
  }));

  return (
    <div>
      <p>Async Await</p>
      {mockData.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
      <CSVLink data={csvData}>Download CSV</CSVLink>
    </div>
  );
};


export default ExportButton;
