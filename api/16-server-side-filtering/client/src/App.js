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

  return (
    <div>
      <h2>Filter Items</h2>
      <form onSubmit={handleFilter}>
        Name:
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />

        Price:
        <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />

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
    </div>
  );
};

export default App;
