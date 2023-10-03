import React, {useState} from 'react';

const Details = ({ formData, handleChange, prevStep, nextStep }) => {
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
    nextStep();
  };

  return (
    <div>
      <h2>Step 2</h2>
        First Name:
        {editing ?
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        }
      <br />
        Last Name:
        {editing ?
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        }
      <br />
        Address:
        {editing ?
        <input type="text" name="address" value={formData.address} onChange={handleChange} />:
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
        }
      <br />
      {editing ? (
        <>
          <button onClick={prevStep}>Previous</button>
          <button onClick={handleSubmit}>Save</button>
        </>
      ) : (
        <>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={nextStep}>Next</button>
        </>
      )}
    </div>
  );
};

export default Details;
