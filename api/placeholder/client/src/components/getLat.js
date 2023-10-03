import React, { useState } from 'react';
import axios from 'axios';

const Latitude = () => {
  const [searclat, setSearchlat] = useState('')

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
  return(
    <div>
      <label>Latitude:</label>
      <input type="text" value={searclat} onChange={(e) => setSearchlat(e.target.value)} />
        <button onClick={handleLangnitude}>Lng</button>
    </div>
  )
}

export default Latitude;