import React, { useState } from 'react';
import axios from 'axios';

const ImportForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImport = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      await axios.post('/api/items', formData);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleImport}>Import Data</button>
    </div>
  );
};

export default ImportForm;