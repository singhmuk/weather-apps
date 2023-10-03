import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Edit from "./edits";

import {BASE_URL} from "./helper";

const formState = { id: 0, name: '', address: {street: '', geo: {lat: ''}},
  phone: '', company: {name: ''}, start: new Date()};

const App = () => {
  const [user, setUser] = useState(formState);
  const [mocks, setMocks] = useState([]);
  const [editing, setEditing] = useState(false);
  const [current, setCurrent] = useState([]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    const fieldNames = name.split('.');
    let updatedUser = { ...user };
  
    let target = updatedUser;
    for (let i = 0; i < fieldNames.length - 1; i++) {
      target = target[fieldNames[i]];
    }
    target[fieldNames[fieldNames.length - 1]] = value;
    setUser(updatedUser);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      const res = await axios.get(`${BASE_URL}/api/items`);
      setMocks(res.data);
  };

  const handleAdd = async () => {
      await axios.post(`${BASE_URL}/api/items`, user);
      fetchData();
      setMocks([...mocks, user])
      setUser(formState);
  };

  const handleRemove =async (_id) => {
    await axios.delete(`${BASE_URL}/api/items/${_id}`)
    setMocks(mocks.filter(vals=>vals._id !== _id));
  }

  const handleEdit = (user) => {
    setEditing(true);
    setCurrent({
      _id: user._id,
      name: user.name,
      'address.street': user.address.street,
      'address.geo.lat': user.address.geo.lat,
      phone: user.phone,
      'company.name': user.company.name
    });
  };

  const handleUpdate =async (_id, updates) => {
    const res = await axios.put(`${BASE_URL}/api/items/${_id}`, updates)
    setEditing(false);
    setMocks(mocks.map(vals => vals._di === _id ? res.data : vals))
  }

  return (
    <div>
      {editing ? 
      <Edit current={current} handleUpdate={handleUpdate} />
    :
    <form onSubmit={(e) => {
      e.preventDefault();
      handleAdd();
    }}>
      Id: 
    <input type="number" name="id" value={user.id} onChange={handleChange} />
    name:
    <input type="text" name="name" value={user.name} onChange={handleChange} />
    street:
    <input type="text" name="address.street" value={user.address.street} onChange={handleChange} />
    lat:
    <input type="text" name="address.geo.lat" value={user.address.geo.lat} onChange={handleChange} />
    phone:
    <input type="text" name="phone" value={user.phone} onChange={handleChange} />
    name:
    <input type="text" name="company.name" value={user.company.name} onChange={handleChange} />
    Date:
    <input type="date" name="start" value={user.start} onChange={handleChange} />
    <br />
    <button type="submit">Add</button>
  </form>
    }
      <ul>
        {mocks.map((val) => (
          <li key={val._id}>
            {val.name} <b>street: </b>{val.address.street}<b>geo: </b> {val.address.geo.lat}
             <b>company: </b> {val.company.name} <b>date: {val.start}</b><br/>
            <button onClick={()=>handleRemove(val._id)}>X</button>
            <button onClick={()=>handleEdit(val)}>E</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
