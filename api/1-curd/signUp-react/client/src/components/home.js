import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [token, setToken] = useState('');
  const history = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      history('/login');
    }
  }, [history]);

  const handleLogout = async () => {
      await axios.post('/auth/logout');
      localStorage.removeItem('token');
      setToken('');
      history('/');
  };

  return (
    <div>
      <h1>Authentication</h1>
      {token ? (
        <div>
          <h1>Welcome to the Home page!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Please Login</p>
      )}
    </div>
  );
};

export default Home;
