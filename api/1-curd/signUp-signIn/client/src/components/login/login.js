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
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
        <button type="submit">Login</button>
        <Link className="signup-link" to="/registration">SignUp</Link>
      </form>
    </div>
  );
};

export default Login;
