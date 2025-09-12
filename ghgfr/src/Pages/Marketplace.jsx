import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/marketplace.css"
import { Link, useNavigate } from 'react-router-dom';

export const Marketplace = () => {
    const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleClick = (productId) => {
    navigate(`/product/${productId}`);
};

  useEffect(() => {
    axios.get('https://backend.climescore.com/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setCategories([...new Set(response.data.map(product => product.category))]);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    let result = products;
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [products, selectedCategory, searchTerm]);

  return (
    <>
    {/* Navbar */}
      <nav className="navbar">
        {/* Left side logo */}
        <div className="logo">Climescore</div>

        {/* Right side menu */}
       <ul className="nav-links">
  <li><Link to="/client/login">Measure Carbon Emission</Link></li>
  <li><Link to="/marketplacehome">Carbon Credits</Link></li>
  <li><Link to="/marketplace">Green Marketplace</Link></li>
  <li><Link to="/blog">Resources</Link></li>
  <li><Link to="/jobs">Jobs</Link></li>
  <li><Link to="/about">About</Link></li>
</ul>
      </nav>
    <div>
      <h1>Marketplace</h1>
      <div id='mainmarket'>

      <div>
        <label htmlFor="category">Filter by Category: </label>
        <select id="category" onChange={e => setSelectedCategory(e.target.value)}>
          <option value="">All</option>
          {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
        </select>
      </div>
      <div>
        <label htmlFor="search">Search: </label>
        <input 
          type="text" 
          id="search" 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
          />
          </div>
      </div>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-card"  onClick={() => handleClick(product._id)}>
            
            <img src={`https://backend.climescore.com${product.images[0]}`} alt={product.name} />
            <h2>{product.name}</h2>
            <h4>₹ {product.price} /-</h4>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
          </>
  );
}


