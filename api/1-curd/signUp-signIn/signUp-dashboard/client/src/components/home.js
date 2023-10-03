import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styling.css";

const Home = () => {
  const [token, setToken] = useState('');
  const [userList, setUserList] = useState([])
  const history = useNavigate();

  const handleUser = async () => {
    const res = await axios.get('/users');
    setUserList(res.data)
    // console.log('res', res.data)
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      history('/login');
    }

    handleUser();
  }, [history, userList]);

  const handleLogout = async () => {
      await axios.post('/auth/logout');
      localStorage.removeItem('token');
      setToken('');
      history('/');
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Home page!</h1>
      {token ? (
        <div>
          <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                </tr>
              </thead>
          {userList.map(item=>(
              <tbody  key={item._id}>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                </tr>
              </tbody>
          ))}
          </table>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p className="login-message">Please Login</p>
      )}
    </div>
  );
};

export default Home;
