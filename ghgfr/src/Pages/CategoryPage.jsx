import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/category.css'; // Ensure this file contains styling for your category page

export const CategoryPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://backend.climescore.com/products'); // Replace with your actual API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p => p.category === category);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    const handleClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="category-page">
            <h1>{category} Products</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="category-products-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <div key={product.id} className="product-item" onClick={() => handleClick(product._id)}>
                                <img src={`https://backend.climescore.com/${product.images[0]}`} alt={product.name} className="product-image" />
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-price">₹ {product.price} /-</p>
                                <p className="product-label">Description:</p>
                                <p className="product-description">{product.description}</p>
                                <p className="product-label">Climescore Rating: <span>{product.rating}</span></p>         
                            </div>
                        ))
                    ) : (
                        <p>No products found in this category.</p>
                    )}
                </div>
            )}
        </div>
    );
};
