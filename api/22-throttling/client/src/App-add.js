import React, { useState, useEffect } from "react";
import axios from "axios";
import { throttle } from "lodash";
import "./App.css";

const App = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);

  const fetchItems = async (title, price) => {
    try {
      const res = await axios.get("/api/items", {params: { title, price}});
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const throttledFetchItems = throttle(fetchItems, 300);

  const handleTitleChange = e => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    throttledFetchItems(newTitle, price);
  };

  const handlePriceChange = e => {
    const newPrice = e.target.value;
    setPrice(newPrice);
    throttledFetchItems(title, newPrice);
  };

  const handleFilter = e => {
    e.preventDefault();
    fetchItems(title, price);
  };

  const handleAddItem = async () => {
    try {
      await axios.post("/api/items", { title, price });
      setTitle("");
      setPrice("");

      fetchItems(title, price);
    } 
    catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems(title, price);
  }, [title, price]);

  return (
    <div className="row">
      <div className="column">
      <h2>Filter Items</h2>
      <form onSubmit={handleFilter}>
        Title:
        <input type="text" id="title" value={title} onChange={handleTitleChange} />
        Price:
        <input type="number" id="price" value={price} onChange={handlePriceChange} />

        <button type="submit">Filter</button>
      </form>

      <h2>Items</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.title} - Price: {item.price}
          </li>
        ))}
      </ul>
      </div>

      <div className="column column-2">
      <h2>Add Item</h2>
      <div>
        Title:
        <input type="text" id="newTitle" value={title}
          onChange={e => setTitle(e.target.value)} required
        />

       Price:
        <input type="number" id="newPrice" value={price}
          onChange={e => setPrice(e.target.value)} required
        />

        <button onClick={handleAddItem}>Add</button>
      </div>
      </div>
    </div>
  );
};

export default App;
