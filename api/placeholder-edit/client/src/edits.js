import { useState, useEffect } from "react";
import _ from "lodash";

const Edit = (props) => {
  const [user, setUser] = useState(props.current);

  useEffect(() => {
    setUser(_.cloneDeep(props.current));
  }, [props.current]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    let updatedUser = { ...user };
  
    // Split the name path into an array of property names
    const fieldNames = name.split(".");
  
    // Access the nested property using the name path
    let target = updatedUser;
    for (let i = 0; i < fieldNames.length - 1; i++) {
      target = target[fieldNames[i]];
    }
    target[fieldNames[fieldNames.length - 1]] = value;
  
    setUser(updatedUser);
  };
  

  return(
    <div>
       <form onSubmit={(e) => {
      e.preventDefault();
      props.handleUpdate(user._id, user);
    }}>
      Id: 
    <input type="number" name="id" value={user._id} onChange={handleChange} />
    name:
    <input type="text" name="name" value={user.name} onChange={handleChange} />
    street:
    <input type="text" name="address.street" value={user.address?.street || ""} onChange={handleChange} />
    lat:
    <input type="text" name="address.geo.lat" value={user.address?.geo?.lat || ""} onChange={handleChange} />
    phone:
    <input type="text" name="phone" value={user.phone} onChange={handleChange} />
    name:
    <input type="text" name="company.name" value={user.company?.name || ""} onChange={handleChange} />
    Date:
    <input type="date" name="start" value={user.start} onChange={handleChange} />
    <br />
    <button type="submit">U</button>
  </form>
    </div>
  )
}

export default Edit;