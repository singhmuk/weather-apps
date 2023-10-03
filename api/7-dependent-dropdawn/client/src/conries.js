import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    axios.get("/api/countries")
      .then((res) => {
        setCountries(res.data);
      })
  }, []);

  const handleCountryChange = (event) => {
    const selectedCountryId = event.target.value;
    setSelectedCountry(selectedCountryId);

    axios.get(`/api/states/${selectedCountryId}`)
      .then((res) => {
        setStates(res.data);
      })
  };

  const handleStateChange = (event) => {
    const selectedStateId = event.target.value;
    setSelectedState(selectedStateId);

    axios.get(`/api/cities/${selectedStateId}`)
      .then((response) => {
        setCities(response.data);
      })
  };

  const handleCityChange = (event) => {
    const selectedCityId = event.target.value;
    setSelectedCity(selectedCityId);
  };

  return (
    <div>
      <label>Country:</label>
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country._id} value={country._id}>
            {country.name}
          </option>
        ))}
      </select>

      <label>State:</label>
      <select value={selectedState} onChange={handleStateChange}>
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state._id} value={state._id}>
            {state.name}
          </option>
        ))}
      </select>

      <label>City:</label>
      <select value={selectedCity} onChange={handleCityChange}>
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city._id} value={city._id}>
            {city.name}
          </option>
        ))}
      </select>
      {console.log("selectedCountry.name", selectedCountry)}
      <div>
        <p>Selected Country: {selectedCountry}</p>
        <p>Selected State: {selectedState}</p>
        <p>Selected City: {selectedCity}</p>
      </div>
    </div>
  );
};

export default App;
