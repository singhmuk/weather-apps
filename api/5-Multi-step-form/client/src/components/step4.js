import React, {useState} from 'react';

const Food = ({ formData, handleChange, prevStep, handleSubmit }) => {
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  return (
    <div>
      <h2>Step 4</h2>
        Food:
        <input type="text" name="food" value={formData.food} onChange={handleChange} />
      <br />
      {editing ? (
        <>
          <button onClick={prevStep}>Previous</button>
          <button onClick={handleSubmit}>Save</button>
        </>
      ) : (
        <>
          <button onClick={handleEdit}>Edit</button>
          <button>Submit</button>
        </>
      )}
    </div>
  );
};

export default Food;
