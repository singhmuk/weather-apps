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

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);

    axios.get(`/api/states/${e.target.value}`)
      .then((res) => {
        setStates(res.data);
      })
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);

    axios.get(`/api/cities/${e.target.value}`)
      .then((res) => {
        setCities(res.data);
      })
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div>
      Country:
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country._id} value={country._id}>
            {country.name}
          </option>
        ))}
      </select>

      State:
      <select value={selectedState} onChange={handleStateChange}>
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state._id} value={state._id}>
            {state.name}
          </option>
        ))}
      </select>

      City:
      <select value={selectedCity} onChange={handleCityChange}>
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city._id} value={city._id}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default App;
