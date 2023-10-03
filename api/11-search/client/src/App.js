import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [searchs, setSearch] = useState('');
  const [result, setResult] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios.get(`/api/items?q=${searchs}`);
    setResult(res.data);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="searchs" value={searchs} onChange={(e)=>setSearch(e.target.value)} />
        <button>Search</button>
      </form>

      <ul>
        {result.map((item) => (
          <li key={item._id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
