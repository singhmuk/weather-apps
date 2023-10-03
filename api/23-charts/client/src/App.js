import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const App = () => {
  const data = [
    { name: 'Red', value: 12 },
    { name: 'Blue', value: 19 },
    { name: 'Yellow', value: 3 },
    { name: 'Green', value: 5 },
    { name: 'Purple', value: 2 },
    { name: 'Orange', value: 3 },
  ];

  return (
    <div>
      <BarChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="red" />
      </BarChart>
    </div>
  );
};

export default App;
