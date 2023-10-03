import React, { useState, useEffect } from "react";
import axios from "axios";
import debounce from 'lodash.debounce';
import "./App.css";

const App = () => {
  const [filterTitle, setFilterTitle] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  // States for adding an item
  const [addItemTitle, setAddItemTitle] = useState("");
  const [addItemPrice, setAddItemPrice] = useState("");

  const fetchFilteredItems = async (title, price) => {
    try {
      const response = await axios.get("/api/items", {
        params: { title, price }});
      setFilteredItems(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const debouncedFetchFilteredItems = debounce(fetchFilteredItems, 300);

  const handleFilterTitleChange = (e) => {
    const newTitle = e.target.value;
    setFilterTitle(newTitle);
    debouncedFetchFilteredItems(newTitle, filterPrice);
  };

  const handleFilterPriceChange = (e) => {
    const newPrice = e.target.value;
    setFilterPrice(newPrice);
    debouncedFetchFilteredItems(filterTitle, newPrice);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/items", {
        title: addItemTitle,
        price: addItemPrice
      });

      setAddItemTitle("");
      setAddItemPrice("");

      // Refresh the filtered items list after adding a new item
      fetchFilteredItems(filterTitle, filterPrice);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFilteredItems(filterTitle, filterPrice);
  }, [filterTitle, filterPrice]);

  return (
    <div className="row">
      <div className="column">
      <h2>Filter Items</h2>
      <form>
        Title:
        <input type="text" id="filterTitle" value={filterTitle} onChange={handleFilterTitleChange} />

        Price:
        <input type="number" id="filterPrice" value={filterPrice} onChange={handleFilterPriceChange} />
      </form>

      <h2>Filtered Items</h2>
      <ul>
        {filteredItems.map((item) => (
          <li key={item._id}>
            {item.title} - Price: {item.price}
          </li>
        ))}
      </ul>
      </div>

      <div className="column column-2">
      <h2>Add Item</h2>
      <form onSubmit={handleAddItem}>
        Title:
        <input type="text" id="addItemTitle" value={addItemTitle} 
          onChange={(e) => setAddItemTitle(e.target.value)} required
        />

        Price:
        <input type="number" id="addItemPrice" value={addItemPrice}
          onChange={(e) => setAddItemPrice(e.target.value)} required
        />

        <button>Add</button>
      </form>
    </div>
    </div>
  );
};

export default App;
