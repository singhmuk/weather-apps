import React, { useState } from 'react';
import axios from 'axios';
import ExportButton from "./export";
import ImportForm from "./importForm";

const App = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/items", { name, price });
      console.log(res.data); 
      setName("");
      setPrice("");
    } 
    catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Data Export</h2>
      <ExportButton />

      <h2>Data Import</h2>
      <ImportForm />
      <br/>
      <div>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        Name:
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required
        />
        Price:
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required
        />

        <button type="submit">Add Item</button>
      </form>
    </div>
    </div>
  );
};

export default App;
