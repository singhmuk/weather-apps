import React, {useState} from 'react';

const Contact = ({ formData, handleChange, prevStep, nextStep }) => {
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
      <h2>Step 3</h2>
        Phone:
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
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

export default Contact;
