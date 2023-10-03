import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Edit from "./edit.js";

const formState = { id: 0, name: '', address: '' };
const Items = () => {
  const [user, setUser] = useState(formState);
  const [mocks, setMocks] = useState([]);
  const [editing, setEditing] = useState(false);
  const [current, setCurrent] = useState(null);
  const [likedItems, setLikedItems] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get('/items');
    setMocks(res.data);
  };

  const config = {
    headers: { 'x-auth-token': localStorage.getItem('token') },
  };

  const handleAdd = async () => {
    await axios.post('/items', user, config);
    setUser(formState);
    fetchData();
  };

  const handleRemove = async (_id) => {
    await axios.delete(`/items/${_id}`, config);
    fetchData();
  };

  const handleEdit = (user) => {
    setEditing(true);
    setCurrent({ ...user });
  };

  const handleUpdate = async (_id, updates) => {
    setEditing(false);
    await axios.put(`/items/${_id}`, updates, config);
    fetchData();
  };

  const handleLike = async (itemId) => {
    await axios.put(`/items/${itemId}/like`, {}, config);
    fetchData();
    setLikedItems([...likedItems, itemId]);
  };

  const handleDislike = async (itemId) => {
    await axios.put(`/items/${itemId}/dislike`, {}, config);
    fetchData();
    setLikedItems(likedItems.filter((id) => id !== itemId));
  };

  const isItemLiked = (itemId) => likedItems.includes(itemId);

  return (
    <div>
      {editing ? (
        <Edit current={current} handleUpdate={handleUpdate} />
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd(user);
          }}
        >
          <input type="number" name="id" value={user.id} onChange={handleChange} />
          <input type="text" name="name" value={user.name} onChange={handleChange} />
          <input type="text" name="address" value={user.address} onChange={handleChange} />
          <br />
          <button type="submit">Add</button>
        </form>
      )}
      {mocks.map((item) => (
        <li key={item._id}>
          {item._id} - {item.name} - {item.address}
          <div>
            {isItemLiked(item._id) ? (
              <button onClick={() => handleDislike(item._id)}>Dislike</button>
            ) : (
              <button onClick={() => handleLike(item._id)}>Like</button>
            )}
          </div>
          <button onClick={() => handleRemove(item._id)}>X</button>
          <button onClick={() => handleEdit(item)}>E</button>
        </li>
      ))}
    </div>
  );
};

export default Items;
