import React, { useState, useEffect } from "react";
import axios from "axios";

import {BASE_URL} from "./helper";

const App = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [error, setError] = useState("");
  const [dataList, setDataList] = useState([]);
  const [updatedValue, setUpdatedValue] = useState("");

  useEffect(() => {
    fetchDataList();
  }, []);

  const fetchDataList = async () => {
      const res = await axios.get(`${BASE_URL}/api/items`);
      setDataList(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedValue) {
      setError("Please select a value");
      return;
    }

      const res = await axios.post(`${BASE_URL}/api/items`, { selectedValue });
      setSelectedValue("");
      setError("");
      fetchDataList(); 
  };

  const handleUpdate = async (id) => {
    if (!updatedValue) {
      setError("Please select an updated value");
      return;
    }

      const res = await axios.put(`${BASE_URL}/api/items/${id}`, {
        selectedValue: updatedValue,
      });
      setUpdatedValue(""); 
      setError("");
      fetchDataList(); // Fetch the updated data list
  };

  const handleEdit = (id) => {
    const selectedData = dataList.find((data) => data._id === id);
    if (selectedData) {
      setUpdatedValue(selectedData.selectedValue);
    }
  };

  const handleDelete = async (id) => {
      await axios.delete(`${BASE_URL}/api/items/${id}`);
      fetchDataList(); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          <option value="">-- Select a value --</option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
        <button type="submit">Save</button>
        {error && <p>{error}</p>}
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate(selectedValue._id);
        }}
      >
        <select
          value={updatedValue}
          onChange={(e) => setUpdatedValue(e.target.value)}
        >
          <option value="">-- Select an updated value --</option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
        <button type="submit">Update</button>
        {error && <p>{error}</p>}
      </form>
      <ul>
        {dataList.map((data) => (
          <li key={data._id}>
            {data.selectedValue}
            <button onClick={() => handleEdit(data._id)}>Edit</button>
            <button onClick={() => handleDelete(data._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
