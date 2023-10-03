import React, { useState, useEffect } from 'react';
import axios from 'axios';

const formState = {
  id: 0,
  name: '',
  username: '',
  email: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
      lat: '',
      lng: ''
    }
  },
  phone: '',
  website: '',
  company: {
    name: '',
    catchPhrase: '',
    bs: ''
  },
};

const App = () => {
  const [user, setUser] = useState(formState);
  const [mocks, setMocks] = useState([]);
  const [userName, setUserName] = useState('');
  const [searclat, setSearchlat] = useState('');
  
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

  const handleGetUser = (id) => {
    const selectedUser = mocks.find((val) => val._id === id);
    if (selectedUser) {
      const userData = `
        _Id: ${selectedUser._id}
        Name: ${selectedUser.name}
        Username: ${selectedUser.username}
        Email: ${selectedUser.email}
        Address: ${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}, ${selectedUser.address.zipcode}
        Geo: ${selectedUser.address.geo.lat}, ${selectedUser.address.geo.lng}
        Phone: ${selectedUser.phone}
        Website: ${selectedUser.website}
        Company: ${selectedUser.company.name}, ${selectedUser.company.catchPhrase}, ${selectedUser.company.bs}
      `;
      alert(userData);
    }
  };

  const handleGetAddress = async (id) => {
    const selectedUser = mocks.find((val) => val._id === id);
    if (selectedUser) {
      const res = await axios.get(`/api/items/${id}`);
      const userAddress = res.data.address;
      const addressData = `
        Street: ${userAddress.street}
        Suite: ${userAddress.suite}
        City: ${userAddress.city}
        Zipcode: ${userAddress.zipcode}
      `;
      alert(addressData);
    }
  };

  const handleZipcode = async (id) => {
    const selectedUser = mocks.find((val) => val._id === id);
    if (selectedUser) {
      const res = await axios.get(`/api/items/${id}`);
      const userZipcode = res.data.address.zipcode;
      alert(`Zipcode: ${userZipcode}`);
    }
  };

  const handleGeo = async (id) => {
    const selectedUser = mocks.find((val) => val._id === id);
    if (selectedUser) {
      const res = await axios.get(`/api/items/${id}`);
      const geo = res.data.address.geo;
      const { lat, lng } = geo;
      alert(`Geo: Lat: ${lat}, Lng: ${lng}`);
    }
  };

  const handleCompany = async (id) => {
    const selectedUser = mocks.find((val) => val._id === id);
    if (selectedUser) {
      const res = await axios.get(`/api/items/${id}`);
      const { company } = res.data;
      const { name, catchPhrase, bs } = company;
      alert(`Company: ${name}, ${catchPhrase}, ${bs}`);
    }
  };

  const handleGName = async (id) => {
    const selectedUser = mocks.find((val) => val._id === id);
    if (selectedUser) {
      const res = await axios.get(`/api/items/${id}?name=${userName}`);
      const userData = JSON.stringify(res.data, null, 2); // Convert to formatted string
      alert(`User Data:\n${userData}`);
    }
  };
  
  const handleLangnitude = async () => {
      const res = await axios.get(`/api/items?lat=${searclat}`);
      const userData = res.data;
      if (userData && userData.length > 0) {
        const { address } = userData[0];
        if (address && address.geo) {
          const { geo } = address;
          const { lat, lng } = geo;
          alert(`Geo: Lat: ${lat}`);
        } else {
          alert('Geo data not available');
        }
      } else {
        alert('User data not found');
      }
  };
  

  return (
    <div>
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
      <div>
      <label>Latitude:</label>
      <input type="text" value={searclat} onChange={(e) => setSearchlat(e.target.value)} />
        <button onClick={handleLangnitude}>Lng</button>
    </div>
      <ul>
        {mocks.map((val) => (
          <li key={val._id}>
            {val.name} <b>address: </b>{val.address.street}
            <b>geo: </b> {val.phone} <b>company: </b> {val.company.catchPhrase}<br/>
            <button onClick={() => handleGetUser(val._id)}>Get</button>
            <button onClick={() => handleGetAddress(val._id)}>Address</button>
            <button onClick={() => handleZipcode(val._id)}>Zip</button>
            <button onClick={() => handleGeo(val._id)}>Geo</button>
            <button onClick={() => handleCompany(val._id)}>Company</button>
            <br/>
            <button onClick={() => handleGName(val._id)}>Name</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
