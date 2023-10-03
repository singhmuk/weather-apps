import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState('');

  const handleFileSelect = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      try {
        const response = await axios.post('/api/items/upload', formData);
        const filePath = response.data.filePath;
        // Handle the uploaded file path as needed
        console.log('File uploaded:', filePath);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleFileTypeChange = (event) => {
    setSelectedFileType(event.target.value);
  };

  return (
    <div>
      <h1>File Upload</h1>
      <div>
        <label htmlFor="fileType">File Type:</label>
        <select id="fileType" value={selectedFileType} onChange={handleFileTypeChange}>
          <option value="">Select file type</option>
          <option value="zip">Zip</option>
          <option value="photo">Photo</option>
          <option value="video">Video</option>
        </select>
      </div>
      <div>
        <Dropzone onDrop={handleFileSelect} accept={selectedFileType === 'zip' ? '.zip' : 'image/jpeg, image/png, video/mp4'}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              {selectedFile ? (
                <p>Selected file: {selectedFile.name}</p>
              ) : (
                <p>Drag and drop a file here or click to select a file</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default App;
