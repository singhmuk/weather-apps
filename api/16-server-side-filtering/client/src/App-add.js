import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
      const res = await axios.get('/api/items', {params: { name, price }});
      setItems(res.data);
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    fetchItems();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      await axios.post('/api/items', { name, price});

      setName('');
      setPrice('');
      fetchItems();
  };

  return (
    <div>
      <h2>Filter Items</h2>
      <form onSubmit={handleFilter}>
        Name:
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

        Price:
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />

        <button>Filter</button>
      </form>

      <p>Items</p>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - Price: {item.price}
          </li>
        ))}
      </ul>

      Add Item
      <form onSubmit={handleSubmit}>
        Name:
        <input type="text" id="newTitle" value={name} onChange={(e) => setName(e.target.value)} required />

        Price:
        <input type="number" id="newPrice" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default App;
