import React, { useState } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

const App = () => {
  const [data, setData] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (inputValue) => {
      const res = await axios.get(`/api/items/suggestions?query=${inputValue}`);
      setSuggestions(res.data);
    } 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(value);
  };

  const handleSuggestionsFetch = (suggestion) => {
    fetchSuggestions(suggestion.value);
  };

  const handleSuggestionsClear = () => {
    setSuggestions([]);
  };

  const getSuggestion = (suggestion) => {
    return suggestion;
  };

  const renderSuggestion = (suggestion) => {
    return <div>{suggestion}</div>;
  };

  const inputProps = {
    placeholder: 'Type a fruit',
    value: data,
    onChange: handleChange,
  };

  return (
    <div>
      <h1>Autocomplete Example</h1>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={handleSuggestionsFetch}
        onSuggestionsClearRequested={handleSuggestionsClear}
        getSuggestionValue={getSuggestion}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
};

export default App;
