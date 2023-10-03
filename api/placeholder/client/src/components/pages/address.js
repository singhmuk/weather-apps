import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserAddress = () => {
  const { id } = useParams();
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [id]);

  //Passing request in body
  const fetchData = async () => {
      const res = await axios.get(`/api/items/${id}/addresses`, {data: { zipcodeLength: 7 }});
  
      if (res.data.address) {
        setAddress(res.data.address);
        setLoading(false);
      } 
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Address for ID: {id}</h2>
      <ul>
        <li>Street: {address.street}</li>
        <li>Suite: {address.suite}</li>
        <li>City: {address.city}</li>
        <li>Zipcode: {address.zipcode}</li>
      </ul>
    </div>
  );
};

export default UserAddress;
