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

  useEffect(() => {
    handleFatch();
  }, []);

  const handleFatch = async () => {
      const res = await axios.get(`${BASE_URL}/api/items`, {
        params: { minPrice, maxPrice, startDate, endDate, categories },
      });
      setItems(res.data);
  };

  const handleFilter = () => {
    handleFatch();
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setMinPrice(value)
  }

  const handleChange2 = (e) => {
    const {name, value} = e.target;
    setMaxPrice(value)
  }

  return (
    <div>
      <h2>Items</h2>

      <div>
        Filter Options:
        Min Price:
        <input type="number" name="minPrice" value={minPrice} onChange={handleChange} />

        Max Price:
        <input type="number" name="maxPrice" value={maxPrice} onChange={handleChange2} />
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

        <button onClick={handleFilter}>Apply Filters</button>
      </div>

      <div>
        <h3>Items List</h3>
        {items.map((item) => (
          <div key={item._id}> Name: {item.name} - Price: {item.price} - Date: {item.date} - 
              Category: {item.category.join(', ')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
