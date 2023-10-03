import { useState, useEffect } from "react";
import axios from 'axios';
import Edit from "./edit.js";

import {BASE_URL} from "./helper";

//Radio
const countries = [
  { id: 1, name: 'India' },
  { id: 2, name: 'USA' },
  { id: 3, name: 'UK' },
];

const formState = {id:0, name:'', address:''};

const App = () => {
  const [user, setUser] = useState(formState);
  const [mocks, setMocks] = useState([]);
  const [editing, setEditing] = useState(false);
  const [current, setCurrent] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    fatchData()
  }, [user])

  const fatchData = async () => {
    const res = await axios.get(`${BASE_URL}/api/items`)
      setMocks(res.data);
      console.log('res',res)
  }

  const handleAdd = async () => {
    await axios.post(`${BASE_URL}/api/items`, user);
    setMocks([...mocks, user]);
    setUser(formState)
  }

  const handleRemove =async (_id) => {
    await axios.delete(`${BASE_URL}/api/items/${_id}`)
    setMocks(mocks.filter(item => item._id !== _id))
  }

  const handleEdit = (user) => {
    setEditing(true);
    setCurrent({_id:user._id, name:user.name, address:user.address});
  }

  const handleUpdate = async (_id, updates) => {
    setEditing(false);
    const res = await axios.put(`${BASE_URL}/api/items/${_id}`, updates)
    setMocks(mocks.map(item => (item._id === _id ? res.data : item)));
  }

  return (
    <div>
      {editing ? (
        <Edit current={current} countries={countries} handleUpdate = {handleUpdate} />
      ):(
        <form onSubmit={(e) => {
          e.preventDefault()
          handleAdd(user)
        }}>
          <input type="number" name="id" value={user._id} onChange={handleChange} />
          <input type="text" name="name" value={user.name} onChange={handleChange} />
          <input type="text" name="address" value={user.address} onChange={handleChange} />

          <select name="country" value={user.country} onChange={handleChange}>
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>

          <br/>
          <button type="submit">Add</button>
        </form>
      )}
      {mocks.map(item => (
        <li key={item._id}>
          {item._id} - {item.name} - {item.address} - {item.country}
          <button onClick={()=>handleRemove(item._id)}>X</button>
          <button onClick={()=>handleEdit(item)}>E</button>
        </li>
      ))}
    </div>
  )
}

export default App;