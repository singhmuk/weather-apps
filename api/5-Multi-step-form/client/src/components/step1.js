import axios from 'axios';
import React, {useState} from 'react';

const Personal = ({ formData, handleChange, nextStep }) => {
  const [editing, setEditing] = useState(false);
  const [isnew, setIsnew] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditing(false);
    nextStep();

    if (isnew) {
      await axios.post('/api/items', formData);
    } else {
      await axios.put(`/api/items/${formData._id}`, formData);
    }
  };

  return (
    <div>
      <h2>Step 1</h2>
        Username:
        {editing ? 
        <input type="text" name="username" value={formData.username} onChange={handleChange} /> :
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      }
      <br />
        Email:
        {editing ? 
        <input type="email" name="email" value={formData.email} onChange={handleChange} />:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      }
      <br />
        Password:
        {editing ? 
        <input type="password" name="password" value={formData.password} onChange={handleChange} />:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      }
      <br />
      {editing ? (<button onClick={handleSubmit}>Save</button>) : 
      (<button onClick={handleEdit}>Edit</button>)}
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default Personal;
