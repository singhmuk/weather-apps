import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Get from "./components/get";
import Form from "./components/form";
import List from "./components/lists";
import Latitude from "./components/getLat";
import CompanyList from './components/pages/company';
import AllUser from './components/pages/allUser';
import UserAddress from './components/pages/address';
import UpdateZipcode from './components/pages/updateZip';


const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  
  return (
    <div>
      <Router>
      <div>
        <Link to="/">Get</Link>
        <Link to="/list">List</Link>
        <Link to="/form">Form</Link>
        <Link to="/getLat">GetLat</Link>
      </div>
        <Routes>
          <Route path="/" element={<Get />} exact />
          <Route path="/list" element={<List />} exact />
          <Route path="/form" element={<Form />} exact />
          <Route path="/getLat" element={<Latitude exact />} />
          <Route exact path="/:id/allUser" element={<AllUser />} />
          <Route path="/:id/company" element={<CompanyList userId={selectedUserId} />} />
          <Route path="/:id/address" element={<UserAddress />} />
          <Route path="/:id/updateZip" element={<UpdateZipcode />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
