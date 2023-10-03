import React, { useEffect, useState } from 'react';
import axios from 'axios';

const formState = { id: 0, name: '', address: '', video: null };

const Items = () => {
  const [user, setUser] = useState(formState);
  const [mocks, setMocks] = useState([]);

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
    headers: { 'x-auth-token': localStorage.getItem('token') }
  };

  const handleVideoChange = (e) => {
    setUser({ ...user, video: e.target.files[0] });
  };

  const handleAdd = async () => {
    const formData = new FormData();
    formData.append('video', user.video);
    formData.append('name', user.name);
    formData.append('address', user.address);

    await axios.post('/items', formData, config);
    setUser(formState);
    fetchData();
  };

  const handleRemove = async (_id) => {
    await axios.delete(`/items/${_id}`, config);
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
        <input type="number" name="id" value={user._id} onChange={handleChange} />
        <input  type="text"  name="name"  value={user.name}  onChange={handleChange} />
        <input  type="text"  name="address"  value={user.address}  onChange={handleChange} />
        <input type="file" accept="video/*" name="videoFile" onChange={handleVideoChange} />
        <br />
        <button type="submit">Add</button>
      </form>

      {mocks.map((item) => (
        <li key={item._id}>
          {item._id} - {item.name} - {item.address}
          {item.video && (
            <video src={`http://localhost:5000/${item.video}`} width="320" height="240" controls>
              Your browser does not support the video tag.
            </video>
          )}
          <button onClick={() => handleRemove(item._id)}>X</button>
        </li>
      ))}
    </div>
  );
};

export default Items;
