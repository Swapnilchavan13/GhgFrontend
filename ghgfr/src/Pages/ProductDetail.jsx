import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/productdetail.css';

export const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://backend.climescore.com/products/${productId}`); // Ensure this endpoint is correct
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
        window.scrollTo(0, 0); // Scroll to top when the component mounts
    }, [productId]);

    const handleBuyNow = () => {
        alert('Buy Now button clicked');
        // Implement buy now functionality
    };

    const handleAddToCart = () => {
        alert('Add to Cart button clicked');
        // Implement add to cart functionality
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <>
            <h1>Product Details</h1>
            <div className="product-detail">
                <img src={`https://backend.climescore.com/${product.images[0]}`} alt={product.name} className="product-detail-image" />
                <div className="product-detail-info">
                    <h1 className="product-detail-name">{product.name}</h1>
                    <p className="product-detail-label">Price:</p>
                    <p className="product-detail-price">₹ {product.price} /-</p>
                    <p className="product-detail-label">Description:</p>
                    <p className="product-detail-description">{product.description}</p>
                    <p className="product-detail-label">Climescore Rating:</p>
                    <p className="product-detail-rating">{product.rating}</p>
                    <div className="product-detail-buttons">
                        <button className="btn btn-buy-now" onClick={handleBuyNow}>Buy Now</button>
                        <button className="btn btn-add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    );
};
