import React, { useState, useEffect } from "react";
import axios from "axios";
import { throttle } from "lodash";
import "./App.css";

const App = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [filtered, setFiltered] = useState([]);

  const fetchItems = async (title, price) => {
      const res = await axios.get("/api/items", {params: { title, price}});
      setFiltered(res.data);
  };

  const throttledItems = throttle(fetchItems, 300);

  const handleTitle = e => {
    const {name, value} = e.target;
    setTitle(value);
    throttledItems(value, price);
  };

  const handlePrice = e => {
    const {name, value} = e.target;
    setPrice(value);
    throttledItems(value, title);
  };

  const handleFilter = e => {
    e.preventDefault();
    fetchItems(title, price);
  };


  return (
    <div className="row">
      <div className="column">
      <h2>Filter Items</h2>
      <form onSubmit={handleFilter}>
        Title:
        <input type="text" id="title" value={title} onChange={handleTitle} />
        Price:
        <input type="number" id="price" value={price} onChange={handlePrice} />

        <button type="submit">Filter</button>
      </form>

      <h2>Items</h2>
      <ul>
        {filtered.map(item => (
          <li key={item._id}>
            {item.title} - Price: {item.price}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default App;
