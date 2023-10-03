import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const formState={name:'', email:'', address:'', phone:'', password:''};
const Registration = ({ handleLogin }) => {
  const [user, setUser] = useState(formState);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]:value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

      const res = await axios.post('/users', user);
      handleLogin();
  };

  return (
    <div className="registration-container">
      <h1>Registration</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
          Name:
          <input type="text" name="name" value={user.name} onChange={handleChange} />
          Email:
          <input type="text" name="email" value={user.email} onChange={handleChange} />
          Address:
          <input type="text" name="address" value={user.address} onChange={handleChange} />
          Phone:
          <input type="text" name="phone" value={user.phone} onChange={handleChange} />
          Password:
          <input type="password" name="password" value={user.password} onChange={handleChange} />
          <br/>
        <button type="submit">Register</button>
      </form>

      <Link className="login-link" to="/auth">Login</Link>
    </div>
  );
};

export default Registration;
