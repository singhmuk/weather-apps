import {useState, useEffect} from "react";

const Edit = (props) => {
  const [user, setUser] = useState(props.current);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    //Radio
    if (type === "radio") {
      setUser({ ...user, [name]: value });
    } else {
      setUser({ ...user, [name]: value });
    }
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
          
          {/* Radio */}
          {props.countries.map((country) => (
          <label key={country.id}>
            <input type="radio" name="country" value={country.name}
              checked={user.country === country.name} onChange={handleChange}
            />
            {country.name}
          </label>
          ))}

          <br/>
          <button type="submit">U</button>
      </form>
    </div>
  )
}

export default Edit;