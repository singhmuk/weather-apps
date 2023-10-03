import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

      const res = await axios.post('/auth', { email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      history('/home');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <Link to="/registration">SignUp</Link>
      </form>
    </div>
  );
};

export default Login;
