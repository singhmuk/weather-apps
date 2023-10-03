import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const App = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [mocks, setMocks] = useState([]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get('/api/items');
    setMocks(res.data)
  }

  const handleSave = async () => {
      const res = await axios.post("/api/items", {
        startDate: startDate,
        endDate: endDate,
      });
  };

  return (
    <div>
      <h2>Date Select</h2>
      <div>
        <label>Start Date: </label>
        <DatePicker selected={startDate} onChange={handleStartDateChange}
          selectsStart startDate={startDate} endDate={endDate}
        />
      </div>
      <div>
        <label>End Date: </label>
        <DatePicker selected={endDate} onChange={handleEndDateChange} selectsEnd
          startDate={startDate} endDate={endDate} minDate={startDate} disabled={!startDate}
        />
      </div>
      <button onClick={handleSave}>Save</button>
      {mocks.map((date) => (
        <li key={date._id}>
          Start Date: {date.startDate}, End Date: {date.endDate}
        </li>
      ))}
    </div>
  );
};

export default App;
