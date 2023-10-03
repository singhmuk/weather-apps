import React, { useState } from "react";
import axios from "axios";

import {BASE_URL} from "./helper";

const App = () => {
  const [choose, setChoose] = useState([]);
  const [mapped, setMapped] = useState([]);

  const handleSelect = (e) => {
    const choosed = Array.from(e.target.options)
            .filter((option) => option.selected)
            .map((option) => option.value);

    setChoose(choosed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${BASE_URL}/api/items`, { choose });
   console.log('click')
    const mapped = choose.map((value) => {
      return value.toUpperCase();
    });
    setMapped(mapped);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select multiple value={choose} onChange={handleSelect}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>
          <option value="option5">Option 5</option>
        </select>
        <button>Submit</button>
      </form>

      <h2>Mapped Values:</h2>
      <ul>
        {mapped.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
