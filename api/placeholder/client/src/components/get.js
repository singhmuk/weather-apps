import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from "./form";
import List from "./lists";
import Latitude from "./getLat";

const formState = { id: 0, name: '', username: '', email: '',
                    address: { street: '', suite: '', city: '', zipcode: '',
                      geo: { lat: '', lng: '' }
                    }, 
                    phone: '', website: '',
                    company: { name: '', catchPhrase: '', bs: ''},
                  };

const Get = () => {
  const [user, setUser] = useState(formState);
  const [mocks, setMocks] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      const res = await axios.get('/api/items');
      setMocks(res.data);
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

  return (
    <div>
      <Form  user={user} setUser={setUser} mocks={mocks} />
      <Latitude />
      <List mocks={mocks} setMocks={setMocks} handleGeo={handleGeo}
       handleZipcode={handleZipcode} handleGetUser={handleGetUser}
      />
    </div>
  );
};

export default Get;
