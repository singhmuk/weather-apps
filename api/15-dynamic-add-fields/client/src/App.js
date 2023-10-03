import { useState, useEffect } from "react";
import axios from 'axios';
import {BASE_URL} from "./helper";

const formState = { id: 0, names: [] };

const App = () => {
  const [user, setUser] = useState(formState);
  const [mocks, setMocks] = useState([]);

  const handleChange = (e, index) => {
    const names = [...user.names];
    names[index] = e.target.value;
    setUser({ ...user, names });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      const res = await axios.get(`${BASE_URL}/api/items`);
      setMocks(res.data);
  };

  const handleAddField = () => {
    setUser({ ...user, names: [...user.names, ""] });
  };

  const handleRemoveField = (index) => {
    const names = [...user.names];
    names.splice(index, 1);
    setUser({ ...user, names });
  };

  const handleAdd = async () => {
      const res = await axios.post(`${BASE_URL}/api/items`, { names: user.names });
      setMocks([...mocks, res.data]);
      setUser({ ...user, names: [] });
  };

  const handleRemove = async (_id) => {
      await axios.delete(`${BASE_URL}/api/items/${_id}`);
      setMocks(mocks.filter(item => item._id !== _id));
  };

  return (
    <div>
        <form>
        {user.names.map((name, index) => (
          <div key={index}>
            <input type="text" name={`names[${index}]`} value={name}
              onChange={(e) => handleChange(e, index)}
            />
            <button type="button" onClick={() => handleRemoveField(index)}>
              X
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddField}>Add Field</button>
        <button type="button" onClick={handleAdd}>Add</button>
      </form>
      {mocks.map(item => (
        <li key={item._id}>
          {item._id} - {item.names.join(", ")}
          <button onClick={() => handleRemove(item._id)}>X</button>
        </li>
      ))}
    </div>
  );
};

export default App;
