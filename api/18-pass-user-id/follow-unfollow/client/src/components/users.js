import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/users', {
          headers: { 'x-auth-token': token },
        });
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const config = {
    headers: {'x-auth-token': localStorage.getItem('token')}
  };

  const handleFollow = (userId) => {
    axios.put(`/users/follow/${userId}`, null, config)
      .then((res) => {
        if (res.data.user) {
          setUsers(prevUsers => {
            return prevUsers.map(user => {
              if (user._id === userId) {
                return { ...user, isFollowing: true };
              }
              return user;
            });
          });
        }
      })
  };
  
  const handleUnfollow = (userId) => {
    axios.put(`/users/unfollow/${userId}`, null, config)
      .then((res) => {
        if (res.data.user) {
          setUsers(prevUsers => {
            return prevUsers.map(user => {
              if (user._id === userId) {
                return { ...user, isFollowing: false };
              }
              return user;
            });
          });
        }
      })
  };
  

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user._id}>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
            {user.isFollowing ? 
              (<button onClick={() => handleUnfollow(user._id)}>Unfollow</button>) : 
              (<button onClick={() => handleFollow(user._id)}>Follow</button>)
            }
          </div>
      ))}
    </div>
  );
};

export default Users;
