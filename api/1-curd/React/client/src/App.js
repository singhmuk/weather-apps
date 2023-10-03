import { useState, useEffect } from "react";
import axios from 'axios';
import Edit from "./edit.js";

const formState = {id:0, name:'', address:''};
const initialState = [{id:1, name:'S', address:'A'}];

const App = () => {
  const [user, setUser] = useState(formState);
  // const [mocks, setMocks] = useState(initialState);
  const [mocks, setMocks] = useState([]);
  const [editing, setEditing] = useState(false);
  // const [current, setCurrent] = useState(initialState);
  const [current, setCurrent] = useState([]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]:value})
  }

  useEffect(() => {
    fatchData()
  }, [user])

  const fatchData = async () => {
    await axios.get('/api/items')
      .then(res => res.data)
      .then(data => setMocks(data))
  }

  const handleAdd = async () => {
    // user.id = mocks.length + 1;
    await axios.post('/api/items', user);
    setMocks([...mocks, user]);
    setUser(formState)
  }

  const handleRemove =async (_id) => {
    // setMocks(mocks.filter(item => item.id !== id))
    await axios.delete(`/api/items/${_id}`)
    setMocks(mocks.filter(item => item._id !== _id))
  }

  const handleEdit = (user) => {
    setEditing(true);
    setCurrent({_id:user._id, name:user.name, address:user.address});
  }

  const handleUpdate = async (_id, updates) => {
    console.log('id', _id)
    setEditing(false);
    // setMocks(mocks.map(item => (item.id === id ? updates : item)));
    const res = await axios.put(`/api/items/${_id}`, updates)
    setMocks(mocks.map(item => (item._id === _id ? res.data : item)));
  }

  return (
    <div>
      {editing ? (
        <Edit current={current} handleUpdate = {handleUpdate} />
      ):(
        <form onSubmit={(e) => {
          e.preventDefault()
          handleAdd(user)
        }}>
          <input type="number" name="id" value={user._id} onChange={handleChange} />
          <input type="text" name="name" value={user.name} onChange={handleChange} />
          <input type="text" name="address" value={user.address} onChange={handleChange} /><br/>
          <button type="submit">Add</button>
        </form>
      )}
      {mocks.map(item => (
        <li key={item._id}>
          {item._id} - {item.name} - {item.address}
          <button onClick={()=>handleRemove(item._id)}>X</button>
          <button onClick={()=>handleEdit(item)}>E</button>
        </li>
      ))}
    </div>
  )
}

export default App;