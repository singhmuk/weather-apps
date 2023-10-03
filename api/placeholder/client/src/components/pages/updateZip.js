import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateZipcode = () => {
  const { id } = useParams();
  const [newZipcode, setNewZipcode] = useState('');

  const handleUpdateZipcode = async () => {
      await axios.put(`/api/updates/${id}/zipcode`, { zipcode: newZipcode });
      console.log('Zipcode updated successfully');
  };

  return (
    <div>
      <h2>Update Zipcode for User ID: {id}</h2>
      <input type="text" value={newZipcode} onChange={(e) => setNewZipcode(e.target.value)}
        placeholder="Enter new zipcode"
      />
      <button onClick={handleUpdateZipcode}>Update Zipcode</button>
    </div>
  );
};

export default UpdateZipcode;
