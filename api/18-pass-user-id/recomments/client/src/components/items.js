import React, { useEffect, useState } from 'react';
import axios from 'axios';

const formState = { id: 0, name: '', address: '', comment: '' }
const Items = () => {
  const [user, setUser] = useState(formState);
  const [mocks, setMocks] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    const res = await axios.get('/items');
    setMocks(res.data);
  };

  const config = {
    headers: { 'x-auth-token': localStorage.getItem('token') }
  };

  const handleAdd = async () => {
    await axios.post('/items', user, config);
    setMocks([...mocks, user]);
    setUser(formState);
  };

  const handleRemove = async (_id) => {
    await axios.delete(`/items/${_id}`, config);
    setMocks(mocks.filter((item) => item._id !== _id));
  };

  const handleAddComment = async (_id, comment) => {
    await axios.post(`/items/${_id}/comment`, { comment }, config);
    fetchData();
  };

  const handleRemoveComment = async (_id, commentId) => {
    await axios.delete(`/items/${_id}/comment/${commentId}`, config);
    fetchData();
  };


  return (
    <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd(user);
          }}
        >
          <input type="number" name="id" value={user.id} onChange={handleChange} />
          <input type="text" name="name" value={user.name} onChange={handleChange} />
          <input type="text" name="address" value={user.address} onChange={handleChange} />
          <button type="submit">Add</button>
        </form>
     
      {mocks.map((item) => (
        <div key={item._id}>
          {item._id} - {item.name} - {item.address}
          <div>
            <input type="text" value={user.comment}
              onChange={(e) => setUser({ ...user, comment: e.target.value })}
            />
            <button onClick={() => handleAddComment(item._id, user.comment)}>
              Add Comment
            </button>
          </div>
          {item.comments.map((comment) => (
            <div key={comment._id}>
             {comment} - 
              <button onClick={() => handleRemoveComment(item._id, comment._id)}>x</button>
            </div>
          ))}
          <button onClick={() => handleRemove(item._id)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default Items;
