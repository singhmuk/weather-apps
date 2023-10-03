import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

import {BASE_URL} from "./helper";

const Items = () => {
  const [items, setItems] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [categories, setCategories] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemDate, setNewItemDate] = useState(null);
  const [newItemCategory, setNewItemCategory] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/items`, {
        params: { minPrice, maxPrice, startDate, endDate, categories },
      });
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterChange = () => {
    fetchItems();
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/items`, {
        name: newItemName,
        price: newItemPrice,
        date: newItemDate,
        category: newItemCategory,
      });

      setNewItemName('');
      setNewItemPrice('');
      setNewItemDate(null);
      setNewItemCategory([]);
    } 
    catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Items</h2>

      <div>
        Filter Options:
        Min Price:
        <input type="number" id="minPrice" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />

        Max Price:
        <input type="number" id="maxPrice" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        <br/>

        Start Date:
        <DatePicker id="startDate" selected={startDate} onChange={(date) => setStartDate(date)} />

        End Date:
        <DatePicker id="endDate" selected={endDate} onChange={(date) => setEndDate(date)} />
        Categories:
        <Select id="categories" isMulti
          options={[
            { value: 'category1', label: 'Category 1' },
            { value: 'category2', label: 'Category 2' },
            { value: 'category3', label: 'Category 3' },
          ]}
          value={categories}
          onChange={(selectedOptions) => setCategories(selectedOptions)}
        />

        <button onClick={handleFilterChange}>Apply Filters</button>
      </div>

      {/* <div>
        <h3>Add Item</h3>
        <form onSubmit={handleAddItem}>
          <label htmlFor="newItemName">Name:</label>
          <input type="text" id="newItemName" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} required />

          <label htmlFor="newItemPrice">Price:</label>
          <input type="number" id="newItemPrice" value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} required />

          <label htmlFor="newItemDate">Date:</label>
          <DatePicker id="newItemDate" selected={newItemDate} onChange={(date) => setNewItemDate(date)} required />

          <label htmlFor="newItemCategory">Category:</label>
          <Select
            id="newItemCategory"
            isMulti
            options={[
              { value: 'category1', label: 'Category 1' },
              { value: 'category2', label: 'Category 2' },
              { value: 'category3', label: 'Category 3' },
            ]}
            value={newItemCategory}
            onChange={(selectedOptions) => setNewItemCategory(selectedOptions)}
            required
          />

          <button type="submit">Add Item</button>
        </form>
      </div> */}

      <div>
        <h3>Items List</h3>
        {items.map((item) => (
          <div key={item._id}>
            <p>Name: {item.name}</p>
            <p>Price: {item.price}</p>
            <p>Date: {item.date}</p>
            <p>Category: {item.category.join(', ')}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
