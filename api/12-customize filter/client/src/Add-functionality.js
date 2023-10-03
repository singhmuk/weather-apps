import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemForm from "./components/iemForm"
const App = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [sortOptions, setSortOptions] = useState({
    price_asc: false,
    price_desc: false,
  });

  useEffect(() => {
    fetchFilteredData();
  }, [selectedCategories, selectedPrices, sortOptions]);

  const fetchFilteredData = async () => {
    try {
      const res = await axios.get('/api/items', {
        params: {
          category: selectedCategories.length > 0 ? selectedCategories : undefined,
          price: selectedPrices.length > 0 ? selectedPrices : undefined,
          sort: Object.keys(sortOptions).filter((option) => sortOptions[option]).join(','),
        },
      });
      setFilteredData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== value));
    }
  };

  const handlePriceChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedPrices([...selectedPrices, value]);
    } else {
      setSelectedPrices(selectedPrices.filter((price) => price !== value));
    }
  };

  const handleSortChange = (event) => {
    const { name, checked } = event.target;
    setSortOptions((prevSortOptions) => ({
      ...prevSortOptions,
      [name]: checked,
    }));
  };


  const handleAddItem = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/items', {
        name,
        category,
        price,
      });
      console.log(response.data);
      setName('');
      setCategory('');
      setPrice('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ItemForm />
      <br />

      <h1>Filtering and Sorting Example</h1>
      <div>
       Category:
            <input type="checkbox" value="electronics" onChange={handleCategoryChange}
              checked={selectedCategories.includes('electronics')}
            />
            Electronics
            <input type="checkbox" value="clothing" onChange={handleCategoryChange}
              checked={selectedCategories.includes('clothing')}
            />
            Clothing
            <input type="checkbox" value="furniture" onChange={handleCategoryChange}
              checked={selectedCategories.includes('furniture')}
            />
            Furniture
      </div>
      <div>
        Price:
            <input type="checkbox" value="50" onChange={handlePriceChange}
              checked={selectedPrices.includes('50')}
            />
            $50
      
            <input type="checkbox" value="100" onChange={handlePriceChange}
              checked={selectedPrices.includes('100')}
            />
            $100
       
            <input type="checkbox" value="200" onChange={handlePriceChange}
              checked={selectedPrices.includes('200')}
            />
            $200
      </div>
      <div>
            <input type="checkbox" name="price_asc" checked={sortOptions.price_asc}
              onChange={handleSortChange}
            />
            Price: Low to High
            <input type="checkbox" name="price_desc" checked={sortOptions.price_desc}
              onChange={handleSortChange}
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
