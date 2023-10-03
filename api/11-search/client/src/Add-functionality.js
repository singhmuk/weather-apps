import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [searchs, setSearch] = useState('');
  const [result, setResult] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch(value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const res = await axios.get(`/api/items?q=${searchs}`);
    setResult(res.data);
  };

  //add
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");

  //add
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post("/api/items", { name, description });
  //     setName("");
  //     setDescription("");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
        <button type="submit">Add Item</button>
      </form>
      <br/> */}

      <form onSubmit={handleSearch}>
        <input type="text" name="searchs" value={searchs} onChange={handleChange} placeholder="Enter search" />
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
