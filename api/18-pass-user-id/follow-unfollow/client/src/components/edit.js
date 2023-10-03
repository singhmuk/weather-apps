import {useState, useEffect} from "react";

const Edit = (props) => {
  const [user, setUSer] = useState(props.current);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUSer({...user, [name]:value})
  }

  useEffect(() => {
    setUSer(props.current)
  },[props]);

  return(
    <div>
      <form onSubmit = {(e) => {
        e.preventDefault()
        props.handleUpdate(user._id, user)
      }}>
        <input type="number" name="id" value={user._id} onChange={handleChange} />
          <input type="text" name="name" value={user.name} onChange={handleChange} />
          <input type="text" name="address" value={user.address} onChange={handleChange} /><br/>
          <button type="submit">U</button>
      </form>
    </div>
  )
}

export default Edit;