import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const res = await axios.get('/users');
        setUsers(res.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user._id}>
          {user.name}
          <p>Email: {user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
