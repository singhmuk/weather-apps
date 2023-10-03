import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');

  return (
    <nav>
      <ul style={{ display: 'flex', flexDirection: 'row' }}>
        <li style={{ marginRight: '10px' }}>
          <Link to="/home">Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
