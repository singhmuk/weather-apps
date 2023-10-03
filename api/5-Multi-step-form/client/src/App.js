import React, { useState } from 'react';
import axios from 'axios';
import Personal from './components/step1';
import Details from './components/step2';
import Contact from './components/step3';
import Food from './components/step4';

import {BASE_URL} from "./components/helper";

const App = () => {
  const formState = {username:'', email:'', password:'', firstName:'', lastName:'', address:'',
                     phone:'', food:''}
  const [formData, setFormData] = useState(formState);
  const [currentstep, setCurrentstep] = useState(1);
  const [displaydata, setDisplaydata] = useState(false);
  const [saved, setSaved] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const nextStep = () => {
    setCurrentstep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentstep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData._id) {
      await axios.put(`${BASE_URL}/api/items/${formData._id}`, formData);
    } 
    else {
      await axios.post(`${BASE_URL}/api/items`, formData);
    }
    console.log('asd')
  };

  const getPersonalInfoCount = () => {
    let count = 0;
    if (formData.username !== '') count++;
    if (formData.email !== '') count++;
    if (formData.password !== '') count++;
    return count;
  };

  const displayUserData = () => {
    setDisplaydata(true);
  };

  const fetchSavedData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/items`);
      setSaved(response.data);
    } 
    catch (err) {
      console.error(err);
    }
  };

  const renderFormStep = () => {
    switch (currentstep) {
      case 1:
        return (
          <Personal formData={formData} handleChange={handleChange} nextStep={nextStep} />
        );
      case 2:
        return (
          <Details formData={formData} handleChange={handleChange} prevStep={prevStep} nextStep={nextStep} />
        );
      case 3:
        return (
          <Contact formData={formData} handleChange={handleChange} prevStep={prevStep} nextStep={nextStep} />
        );
      case 4:
        return (
          <Food formData={formData} handleChange={handleChange} prevStep={prevStep} handleSubmit={handleSubmit} />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>{renderFormStep()}</form>
      {currentstep > 1 && (<button onClick={displayUserData}>Get</button>)}
      {displaydata && (
        <div>
          <h2>User Data:</h2>
          <p>Count: {getPersonalInfoCount()}</p>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
      <button onClick={fetchSavedData}>Fetch</button>
      {saved && (
        <div>
          <h2>Saved:</h2>
          <pre>{JSON.stringify(saved, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
