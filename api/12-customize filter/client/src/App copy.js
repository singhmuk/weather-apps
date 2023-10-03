import React, { useState, useEffect } from 'react';
import axios from 'axios';


const App = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [prices, setPrices] = useState([]);
  const [sorts, setSorts] = useState({ price_asc: false, price_desc: false });

  useEffect(() => {
    fetchFilteredData();
  }, [categories, prices, sorts]);

  const fetchFilteredData = async () => {
      const res = await axios.get('/api/items', {
        params: {
          category: categories.length > 0 ? categories : undefined,
          price: prices.length > 0 ? prices : undefined,
          sort: Object.keys(sorts).filter((option) => sorts[option]).join(','),
        },
      });
      setFilteredData(res.data);
  };

  const handleCategory = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategories([...categories, value]);
    } else {
      setCategories(categories.filter((category) => category !== value));
    }
  };

  const handlePrice = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPrices([...prices, value]);
    } else {
      setPrices(prices.filter((price) => price !== value));
    }
  };

  const handleSort = (e) => {
    const { name, checked } = e.target;
    setSorts((prevSortOptions) => ({...prevSortOptions, [name]:checked }));
  };

  return (
    <div>
      <h1>Filtering and Sorting</h1>
      <div>
       Category:
            <input type="checkbox" value="electronics" onChange={handleCategory}
              checked={categories.includes('electronics')}
            />
            Electronics
            <input type="checkbox" value="clothing" onChange={handleCategory}
              checked={categories.includes('clothing')}
            />
            Clothing
            <input type="checkbox" value="furniture" onChange={handleCategory}
              checked={categories.includes('furniture')}
            />
            Furniture
      </div>
      <div>
        Price:
            <input type="checkbox" value="50" onChange={handlePrice}
              checked={prices.includes('50')}
            />
            $50
      
            <input type="checkbox" value="100" onChange={handlePrice}
              checked={prices.includes('100')}
            />
            $100
       
            <input type="checkbox" value="200" onChange={handlePrice}
              checked={prices.includes('200')}
            />
            $200
      </div>
      <div>
            <input type="checkbox" name="price_asc" checked={sorts.price_asc}
              onChange={handleSort}
            />
            Price: Low to High
            <input type="checkbox" name="price_desc" checked={sorts.price_desc}
              onChange={handleSort}
            />
            Price: High to Low
      </div>
      <h2>Filtered Items:</h2>
      <ul>
        {filteredData.map((item) => (
          <li key={item._id}>
            {item.name} - Category: {item.category} -  Price: ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
