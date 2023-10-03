import React, { useState } from 'react';
import axios from 'axios';
import ExportButton from "./export";
import ImportForm from "./importForm";

const App = () => {

  return (
    <div>
      <h2>Data Export</h2>
      <ExportButton />

      <h2>Data Import</h2>
      <ImportForm />
    </div>
  );
};

export default App;
