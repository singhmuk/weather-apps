import React, { useState, useEffect } from "react";
import axios from "axios";
import debounce from 'lodash.debounce';
import "./App.css";

const App = () => {
  const [title, setTitle] = useState("");
  const [prices, setPrices] = useState("");
  const [filtered, setFiltered] = useState([]);

  const fetchItems = async (title, price) => {
      const res = await axios.get("/api/items", {params: { title, price }});
      setFiltered(res.data);
  };

  const debouncedItems = debounce(fetchItems, 300);

  const handleTitle = (e) => {
    const {name, value} = e.target;
    setTitle(value);
    debouncedItems(value, prices);
  };

  const handlePrice = (e) => {
    const {name, value} = e.target;
    setPrices(value);
    debouncedItems(value, title);
  };

  useEffect(() => {
    fetchItems(title, prices);
  }, [title, prices]);

  return (
    <div className="row">
      <div className="column">
      <h2>Filter Items</h2>
      <form>
        Title:
        <input type="text" id="title" value={title} onChange={handleTitle} />

        Price:
        <input type="number" id="prices" value={prices} onChange={handlePrice} />
      </form>

      <h2>Filtered Items</h2>
      <ul>
        {filtered.map((item) => (
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
