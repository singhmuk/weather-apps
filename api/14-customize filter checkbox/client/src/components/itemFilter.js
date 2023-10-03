import React from 'react';

const ItemFilter = ({ categories, prices, sorts, handleCategory, handlePrice, handleSort }) => {
  return (
    <div>
      <h1>Filtering and Sorting Example</h1>
        Category:
        <select id="category" value={categories} onChange={handleCategory}>
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="furniture">Furniture</option>
        </select>
        Price:
        <select id="price" value={prices} onChange={handlePrice}>
          <option value="">All</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
        </select>
        Sort by:
        <select id="sort" value={sorts} onChange={handleSort}>
          <option value="">None</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
    </div>
  );
};

export default ItemFilter;
