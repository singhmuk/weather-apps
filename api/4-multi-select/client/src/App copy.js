import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [mappedValues, setMappedValues] = useState([]);

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.options)
            .filter((option) => option.selected)
            .map((option) => option.value);

    setSelectedValues(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/items", { selectedValues });
    } catch (err) {
      console.error(err);
    }
    const mappedValues = selectedValues.map((value) => {
      return value.toUpperCase();
    });
    setMappedValues(mappedValues);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select multiple value={selectedValues} onChange={handleSelectChange}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>
          <option value="option5">Option 5</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      <h2>Mapped Values:</h2>
      <ul>
        {mappedValues.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
