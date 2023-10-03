import React, { useState } from 'react';
import axios from 'axios';

const ItemForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleAddItem = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/items', { name, category, price });
      setName('');
      setCategory('');
      setPrice('');
    } 
    catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Add Item</h1>
      <form onSubmit={handleAddItem}>
        Name:
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        Category:
        <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />

        Price:
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default ItemForm;
