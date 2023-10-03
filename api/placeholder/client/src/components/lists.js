import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const List = (props) => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/items');
      setUserList(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleGetAddress = async (id) => {
    const selectedUser = userList.find((val) => val._id === id);
    if (selectedUser) {
      try {
        const res = await axios.get(`/api/items/${id}`);
        const userAddress = res.data.address;
        const addressData = `
          Street: ${userAddress.street}
          Suite: ${userAddress.suite}
          City: ${userAddress.city}
          Zipcode: ${userAddress.zipcode}
        `;
        alert(addressData);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }
  };

  const handleCompany = async (id) => {
    const selectedUser = userList.find((val) => val._id === id);
    if (selectedUser) {
      try {
        const res = await axios.get(`/api/items/${id}`);
        const { company } = res.data;
        const { name, catchPhrase, bs } = company;
        alert(`Company: ${name}, ${catchPhrase}, ${bs}`);
      } catch (error) {
        console.error('Error fetching company:', error);
      }
    }
  };

  const handleGName = async (id) => {
    const selectedUser = userList.find((val) => val._id === id);
    if (selectedUser) {
      try {
        const res = await axios.get(`/api/items/${id}?name=${userName}`);
        const userData = JSON.stringify(res.data, null, 2); // Convert to formatted string
        alert(`User Data:\n${userData}`);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  const handleRemove =async (_id) => {
    await axios.delete(`/api/items/${_id}`)
    setUserList(userList.filter(vals => vals._id !== _id))
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {userList.map((val) => (
        <li key={val._id}>
          {val._id} <b>address: </b>
          {val.address && val.address.street}
          <b>geo: </b> {val.phone} <b>company: </b> {val.company && val.company.catchPhrase}
          <br/>
          <button onClick={() => props.handleGetUser(val._id)}>Get</button>
          <button onClick={() => handleGetAddress(val._id)}>Address</button>
          <button onClick={() => props.handleZipcode(val._id)}>Zip</button>
          <button onClick={() => props.handleGeo(val._id)}>Geo</button>
          <button onClick={() => handleCompany(val._id)}>Company</button>
          <button onClick={() => handleGName(val._id)}>Name</button>
          <button onClick={() => handleRemove(val._id)}>X</button><br/>
          <Link to={`/${val._id}/allUser`}>Get</Link> &nbsp;
          <Link to={`/${val._id}/company`}>Company</Link> &nbsp;
          <Link to={`/${val._id}/address`}>Address</Link> &nbsp;
          <Link to={`/${val._id}/updateZip`}>Updatezip</Link>
        </li>
      ))}
    </ul>
  );
};

export default List;
