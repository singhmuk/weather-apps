import {useState, useEffect} from "react";

const Edit = (props) => {
  const [user, setUser] = useState(props.current);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    setUser(props.current)
  },[props]);

  return(
    <div>
      <form onSubmit = {(e) => {
        e.preventDefault()
        props.handleUpdate(user._id, user)
      }}>
        <input type="number" name="id" value={user._id} onChange={handleChange} />
          <input type="text" name="name" value={user.name} onChange={handleChange} />
          <input type="text" name="address" value={user.address} onChange={handleChange} />
          
          <select name="country" value={user.country} onChange={handleChange}>
            {props.countries.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>

          <br/>
          <button type="submit">U</button>
      </form>
    </div>
  )
}

export default Edit;