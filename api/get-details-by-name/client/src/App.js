import { useState, useEffect } from "react"; 
import axios from "axios";

const formState={id:0,name:'',address:''};
const initialState=[{id:1,name:'A',address:'AS'}]
const App=()=>{
 const [user, setUser]=useState(formState);
 const [mocks,setMocks]=useState(initialState);

 const handleChange=(e)=>{
  const {name,value}=e.target;
  setUser({...user, [name]:value})
 }

 useEffect(()=>{
  fathData();
 },[user])

 const fathData =async () => {
  const res = await axios.get('/api/items')
  setMocks(res.data)
 }

 const handleAdd=async ()=>{
  await axios.post('./api/items', user)
  setMocks([...mocks,user]);
  setUser(formState)
 }

 //fatch by name
 const fatchByName =async (name) => {
  const res = await axios.get(`/api/items/${name}`);
  return res.data;
 }
 const handleGetByName = async (name) => {
  const item = await fatchByName(name);
    setUser({ ...user, _id: item._id, address: item.address });
    alert(`User ID: ${item._id}\nAddress: ${item.address}`);
};


 return(
  <div>
    <form onSubmit={(e)=>{
      e.preventDefault()
      handleAdd(user)
    }}>
      <input type="number" name="id" value={user.id} onChange={handleChange} />
      <input type="text" name="name" value={user.name} onChange={handleChange} />
      <input type="text" name="address" value={user.address} onChange={handleChange} /><br/>
      <button>Add</button>
    </form>
    
    {mocks.map(val=> (
        <li key={val._id}>
        {val.name} - {val.address}
        <button onClick={() => handleGetByName(val.name)}>Get</button>
      </li>
      ))}
  </div>
 )
}

export default App;