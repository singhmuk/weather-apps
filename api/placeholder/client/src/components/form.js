import React, { useState, useEffect } from 'react';
import axios from 'axios';

const formState = { id: 0, name: '', username: '', email: '',
                    address: { street: '', suite: '', city: '', zipcode: '',
                      geo: { lat: '', lng: '' }
                    }, 
                    phone: '', website: '',
                    company: { name: '', catchPhrase: '', bs: ''},
                  };

const Form = (props) => {
  const [user, setUser] = useState(formState);
  const [mocks, setMocks] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Split the field name into nested properties
    const fieldNames = name.split('.');
    let updatedUser = { ...user };

    // Update the nested property value
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
      const res = await axios.get('/api/items');
      setMocks(res.data);
  };

  const handleAdd = async () => {
    await axios.post('/api/items', user);
    fetchData();
    setMocks([...mocks, user])
    setUser(formState);
};

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleAdd();
    }}>
      Id: 
      <input type="number" name="id" value={user.id} onChange={handleChange} />
      name:
      <input type="text" name="name" value={user.name} onChange={handleChange} />
      username:
      <input type="text" name="username" value={user.username} onChange={handleChange} />
      email:
      <input type="text" name="email" value={user.email} onChange={handleChange} />
      street:
      <input type="text" name="address.street" value={user.address.street} onChange={handleChange} />
      suite:
      <input type="text" name="address.suite" value={user.address.suite} onChange={handleChange} />
      city:
      <input type="text" name="address.city" value={user.address.city} onChange={handleChange} />
      zipcode:
      <input type="text" name="address.zipcode" value={user.address.zipcode} onChange={handleChange} />
      lat:
      <input type="text" name="address.geo.lat" value={user.address.geo.lat} onChange={handleChange} />
      lng:
      <input type="text" name="address.geo.lng" value={user.address.geo.lng} onChange={handleChange} />
      phone:
      <input type="text" name="phone" value={user.phone} onChange={handleChange} />
      website:
      <input type="text" name="website" value={user.website} onChange={handleChange} />
      name:
      <input type="text" name="company.name" value={user.company.name} onChange={handleChange} />
      catchPhrase:
      <input type="text" name="company.catchPhrase" value={user.company.catchPhrase} onChange={handleChange} />
      bs:
      <input type="text" name="company.bs" value={user.company.bs} onChange={handleChange} />
      <br />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
