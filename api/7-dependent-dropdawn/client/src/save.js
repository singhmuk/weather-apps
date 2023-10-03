import React, { useEffect, useState } from "react";
import axios from "axios";

const Saving = () => {
  const handleSaveData = () => {
    const data = {
      countryId: selectedCountry,
      stateId: selectedState,
      cityId: selectedCity,
    };

    axios
      .post("/api/saveData", data)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Failed to save data:", error);
      });
  };

  return (
    <div>
      <button onClick={handleSaveData}>Save Data</button>
    </div>
  );
};

export default Saving;
