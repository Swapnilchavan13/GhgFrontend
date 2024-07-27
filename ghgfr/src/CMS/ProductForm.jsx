import React, { useState, useEffect } from 'react';
import '../styles/CMS.css';

export const ProductForm = ({ addProduct }) => {
    const [product, setProduct] = useState({
        name: '',
        images: [], // Array to hold image file objects
        price: '',
        description: '',
        rating: '',
        category: '', // Category field
        quantity: ''
    });
    const [products, setProducts] = useState([]);

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/products');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length <= 3) {
            setProduct({ ...product, images: files });
        } else {
            alert('You can only upload up to 3 images.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        product.images.forEach((file, index) => {
            formData.append('images', file);
        });
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('rating', product.rating);
        formData.append('category', product.category);
        formData.append('quantity', product.quantity);

        try {
            const response = await fetch('http://localhost:8080/addproduct', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const newProduct = await response.json();
                setProducts([...products, newProduct]); // Update state with the new product
                setProduct({
                    name: '',
                    images: [],
                    price: '',
                    description: '',
                    rating: '',
                    category: '', // Reset category
                    quantity: ''
                });
            } else {
                const errorData = await response.json();
                console.error('Failed to add product:', errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Handle product deletion
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/products/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setProducts(products.filter(product => product._id !== id)); // Remove deleted product from state
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} id='mainproductform'>
                <h1>Add Products</h1>

                <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" required />
                <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleImageChange} 
                    required 
                />
                <div>
                    {product.images && Array.from(product.images).map((file, index) => (
                        <img 
                            key={index}
                            src={URL.createObjectURL(file)} 
                            alt={`Preview ${index + 1}`} 
                            style={{ width: '100px', height: 'auto', margin: '10px' }} 
                        />
                    ))}
                </div>
                <input type="text" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
                <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Description" required />
                <input type="text" name="rating" value={product.rating} onChange={handleChange} placeholder="Rating" required />
                <select name="category" value={product.category} onChange={handleChange} required>
                    <option value="" disabled>Select Category</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Bath & Toiletries">Bath & Toiletries</option>
                    <option value="Linen & Cloth">Linen & Cloth</option>
                    <option value="Consumables & Housekeeping">Consumables & Housekeeping</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Other">Other</option>
                </select>
                <input type="number" name="quantity" value={product.quantity} onChange={handleChange} placeholder="Product Quantity" required />

                <button type="submit">Add Product</button>
            </form>

            <h2>All Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        {product.name}
                        <button onClick={() => handleDelete(product._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
