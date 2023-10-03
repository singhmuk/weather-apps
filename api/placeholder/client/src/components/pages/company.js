import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CompanyList = () => {
  const [companyList, setCompanyList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/items/${id}/company`);
      setCompanyList(res.data);
    } catch (error) {
      console.error('Error fetching company list:', error);
    }
  };

  return (
    <div>
      <h2>Company List for User ID: {id}</h2>
      <ul>
        {companyList && Object.keys(companyList).length !== 0 ? (
          Object.values(companyList).map((company) => (
            <li key={company._id}>
              {company}
              </li>
          ))
        ) : (
          <li>No companies available</li>
        )}
      </ul>
    </div>
  );
};

export default CompanyList;
