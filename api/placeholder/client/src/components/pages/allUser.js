import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AllUser = () => {
  const [companyList, setCompanyList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/items/${id}/allUser`);
      // setCompanyList(res.data);
      setCompanyList(Object.values(res.data));
    } catch (error) {
      console.error('Error fetching company list:', error);
    }
  };

  return (
    <div>
      <h2>Company List for User ID: {id}</h2>
      <ul>
        {/* {companyList.map(vals=>(
          <li key={vals._id}>
            {vals}
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default AllUser;
