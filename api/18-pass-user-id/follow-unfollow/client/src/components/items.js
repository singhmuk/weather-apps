import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Edit from "./edit.js";

const formState = {id:0, name:'', address:''};
const Items = () => {
  const [user, setUser] = useState(formState);
  const [mocks, setMocks] = useState([]);
  const [editing, setEditing] = useState(false);
  const [current, setCurrent] = useState([]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]:value})
  }

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
      const res = await axios.get('/items');
      setMocks(res.data);
  };

  const config = {
    headers: {'x-auth-token': localStorage.getItem('token')}
  };
  
  const handleAdd = async () => {
    await axios.post('/items', user, config);
    setMocks([...mocks, user]);
    setUser(formState)
  }

  const handleRemove =async (_id) => {
    await axios.delete(`/items/${_id}`, config)
    setMocks(mocks.filter(item => item._id !== _id))
    //   fetchData();
  }

  const handleEdit = (user) => {
    setEditing(true);
    setCurrent({_id:user._id, name:user.name, address:user.address});
  }

  const handleUpdate = async (_id, updates) => {
    console.log('id', _id)
    setEditing(false);
    const res = await axios.put(`/items/${_id}`, updates, config)
    setMocks(mocks.map(item => (item._id === _id ? res.data : item)));
  }

  return (
    <div>
      {editing ? (
        <Edit current={current} handleUpdate = {handleUpdate} />
      ):(
        <form onSubmit={(e) => {
          e.preventDefault()
          handleAdd(user)
        }}>
          <input type="number" name="id" value={user._id} onChange={handleChange} />
          <input type="text" name="name" value={user.name} onChange={handleChange} />
          <input type="text" name="address" value={user.address} onChange={handleChange} /><br/>
          <button type="submit">Add</button>
        </form>
      )}
      {mocks.map(item => (
        <li key={item._id}>
          {item._id} - {item.name} - {item.address}
          <button onClick={()=>handleRemove(item._id)}>X</button>
          <button onClick={()=>handleEdit(item)}>E</button>
        </li>
      ))}
    </div>
  );
};

export default Items;
