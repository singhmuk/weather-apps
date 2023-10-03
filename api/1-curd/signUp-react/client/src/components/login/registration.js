import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Registration = ({ handleLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

      const res = await axios.post('/users', { name, email, password, isAdmin});
      handleLogin(); // Call the handleLogin function to update the authentication status
  };

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          Admin:
          <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} /><br/>
        <button type="submit">Register</button>
      </form>

      <Link to="/auth">Login</Link>
    </div>
  );
};

export default Registration;
