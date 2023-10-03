import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [conditions, setConditions] = useState([]);
  const [orValues, setOrValues] = useState([]);
  const [orAndValues, setOrAndValues] = useState([]);
  const [levelValue, setLevelValue] = useState('');

  useEffect(() => {
    fetchConditions();
  }, []);

  const fetchConditions = async () => {
      const params = {};

      if (orValues.length > 0) {
        params.or = orValues;
      }

      if (orAndValues.length > 0) {
        params.orAnd = orAndValues;
      }

      if (levelValue) {
        params.level = levelValue;
      }

      const res = await axios.get('/api/items', { params });
      setConditions(res.data);
  };

  const handleDelete = async (id) => {
      await axios.delete(`/api/items/${id}`);
      fetchConditions();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCondition = {
      title: e.target.title.value,
      age: parseInt(e.target.age.value),
      list: e.target.list.value.split(','),
      status: e.target.status.checked,
      qty: parseInt(e.target.qty.value),
      level: e.target.level.value.split(',').map((num) => parseInt(num)),
    };

    axios.post('/api/items', newCondition)
      .then((res) => {
        console.log('Condition created successfully:', res.data);
        fetchConditions();
      })
      .catch((error) => {
        console.error('Error creating condition:', error);
      });

    e.target.reset();
  };

  return (
    <div>
      <h2>Create Condition</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" required />
        </div>
        <div>
          <label>List:</label>
          <input type="text" name="list" required />
        </div>
        <div>
          <label>Status:</label>
          <input type="checkbox" name="status" />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" name="qty" required />
        </div>
        <div>
          <label>Level:</label>
          <input type="text" name="level" required />
        </div>
        <button type="submit">Create Condition</button>
      </form>

      <h2>Filter Conditions</h2>
      <div>
        <label>Filter by OR values:</label>
        <input
          type="text"
          value={orValues}
          onChange={(e) => setOrValues(e.target.value.split(','))}
        />
      </div>
      <div>
        <label>Filter by OR-AND values:</label>
        <input
          type="text"
          value={orAndValues}
          onChange={(e) => setOrAndValues(e.target.value.split(','))}
        />
      </div>
      <div>
        <label>Filter by Level:</label>
        <input
          type="text"
          value={levelValue}
          onChange={(e) => setLevelValue(e.target.value)}
        />
      </div>
      <button onClick={fetchConditions}>Apply Filters</button>

      <h2>Conditions</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Age</th>
            <th>List</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Level</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {conditions.map((condition) => (
            <tr key={condition._id}>
              <td>{condition.title}</td>
              <td>{condition.age}</td>
              <td>{condition.list.join(', ')}</td>
              <td>{condition.status.toString()}</td>
              <td>{condition.qty}</td>
              <td>{condition.level.join(', ')}</td>
              <td>
                <button onClick={() => handleDelete(condition._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
