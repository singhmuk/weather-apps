import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Users from './components/users';
import Registration from './components/login/registration';
import Login from './components/login/login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = localStorage.getItem('token');
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  console.log('isAuthenticated',isAuthenticated)

  return (
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}
          />
          <Route path="/registration" element={<Registration handleLogin={handleLogin} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route
            path="/login"
            element={<Login handleLogin={handleLogin} />}
          />
        </Routes>
      </div>
  );
};

export default App;
