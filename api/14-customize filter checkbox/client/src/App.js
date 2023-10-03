import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemForm from './components/iemForm';
import ItemFilter from './components/itemFilter';

const App = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState('');
  const [prices, setPrices] = useState('');
  const [sorts, setSorts] = useState('');

  useEffect(() => {
    handleFatch();
  }, [categories, prices, sorts]);

  const handleFatch = async () => {
      const res = await axios.get('/api/items', {
        params: {
          filters: JSON.stringify({ category: categories, price: prices }),
          category: categories || undefined, // Pass undefined if no category is selected,
          price: prices,
          sort: sorts,
        },
      });
      setFilteredData(res.data);
  };

  const handleCategory = (e) => {
    setCategories(e.target.value);
  };

  const handlePrice = (e) => {
    setPrices(e.target.value);
  };

  const handleSort = (e) => {
    setSorts(e.target.value);
  };

  return (
    <div>
      <ItemFilter
        categories={categories}
        prices={prices}
        sorts={sorts}
        handleCategory={handleCategory}
        handlePrice={handlePrice}
        handleSort={handleSort}
      />

      <h2>Filtered Items:</h2>
      <ul>
        {filteredData.map((item) => (
          <li key={item._id}>
            {item.name} - Category: {item.category} - Price: ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
