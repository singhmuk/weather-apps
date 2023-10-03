import React, { useState, useEffect } from "react";
import axios from "axios";

import {BASE_URL} from "./helper";

const App = () => {
  const [selected, setSelected] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newitem, setNewitem] = useState("");
  const [dropdownitems, setDropdownitems] = useState([]);

  useEffect(() => {
    fetchDropdown();
  }, []);

  const fetchDropdown = async () => {
    const res = await axios.get(`${BASE_URL}/api/items`);
    setDropdownitems(res.data);
  };

  const handleClose = () => {
    setSelected("");
    setModalOpen(false);
  };

  const handleAdd = async () => {
    const newItem = {
      name: newitem,
      label: newitem,
    };

    const res = await axios.post(`${BASE_URL}/api/items`, newItem);

    setDropdownitems([...dropdownitems, res.data.item]);
    setSelected("");
    setNewitem("");
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/api/items/${id}`);
    setDropdownitems(dropdownitems.filter((item) => item._id !== id));
  };

  return (
    <div>
      <select value={selected} onChange={(e)=>setSelected(e.target.value)}>
        {dropdownitems.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
        <option disabled>------</option>
        <option value="add">Add Item</option>
      </select>
      {selected === "add" && (
        <div>
          <input type="text" value={newitem} onChange={(e)=>setNewitem(e.target.value)} />
          <button onClick={handleAdd}>Add</button>
          <button onClick={handleClose}>X</button>
        </div>
      )}
      {dropdownitems.map((item) => (
        <div key={item._id}>
          {item.name}
          <button onClick={() => handleDelete(item._id)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default App;
