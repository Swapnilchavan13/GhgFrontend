import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/category.css'; // Create this CSS file for category page styling

const dummyProducts = [
    { id: 1, name: 'Automatic Hand Soap Dispenser', image: 'https://cms.interiorcompany.com/wp-content/uploads/2024/02/automatic-hand-soap-dispenser-unique-kitchen-appliances.jpg', price: '₹500', description: 'Touchless hand soap dispenser with sleek design for modern kitchens.', rating: '4.5', category: 'Kitchen' },
    { id: 2, name: 'Smart Kitchen Scale', image: 'https://s.alicdn.com/@sc04/kf/H1bb72dea7de8483f8deb1881b3ce2318N.jpg_300x300.jpg', price: '₹750', description: 'Accurate digital kitchen scale with easy-to-read display and multiple unit conversions.', rating: '4.7', category: 'Kitchen' },
    { id: 3, name: 'Airtight Food Containers', image: 'https://hometown.gumlet.io/media/cms/icons/Kitchenware/Contaners11.jpg?w=300&dpr=2.6', price: '₹1000', description: 'Set of airtight food containers to keep your kitchen organized and food fresh.', rating: '4.3', category: 'Kitchen' },
    { id: 4, name: 'Stainless Steel Tea Kettle', image: 'https://www.tasteofhome.com/wp-content/uploads/2021/02/tea-kettle.jpeg?fit=700%2C700', price: '₹1250', description: 'Durable stainless steel tea kettle with ergonomic handle and spout for easy pouring.', rating: '4.8', category: 'Kitchen' },
    { id: 5, name: 'Smart Induction Cooktop', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmvD3cNXdO-JJ_XUhf_hm83xhqlUK-zohMmg&s', price: '₹1500', description: 'Energy-efficient induction cooktop with touch controls and multiple cooking modes.', rating: '4.6', category: 'Kitchen' },
    { id: 6, name: 'Multipurpose Folding Table', image: 'https://www.haworth.com/content/dam/haworth-com/global/vertical-markets/healthcare/maari-tablet-environmental-6-1440.jpg', price: '₹1750', description: 'Compact folding table ideal for small spaces and versatile use.', rating: '4.2', category: 'Furniture' },
    { id: 7, name: 'Glass Door Crockery Unit', image: 'https://5.imimg.com/data5/SELLER/Default/2021/2/RS/NS/OW/30554035/glass-door-crockery-unit-500x500.jpg', price: '₹2000', description: 'Elegant glass door crockery unit to showcase and store your fine china and glassware.', rating: '4.9', category: 'Furniture' },
    { id: 8, name: 'Bathroom Towel Rack', image: 'https://m.media-amazon.com/images/I/71xD9M5vT6L.jpg', price: '₹300', description: 'Stylish towel rack for modern bathrooms.', rating: '4.4', category: 'Bath & Toiletries' },
    { id: 9, name: 'Toilet Brush Set', image: 'https://5.imimg.com/data5/SELLER/Default/2022/3/WK/KX/HC/133083788/2-in-1-silicone-toilet-brush-for-wc-tools-drainable-toilet-brush-250x250.jpg', price: '₹150', description: 'Complete toilet brush and holder set.', rating: '4.0', category: 'Bath & Toiletries' },
    { id: 10, name: 'Comfortable Linen Bed Sheet', image: 'https://cpimg.tistatic.com/05063803/b/4/Hotel-Bed-Sheets.jpeg', price: '₹1200', description: 'Soft and comfortable linen bed sheet set.', rating: '4.7', category: 'Linen & Cloth' },
    // Add more products as needed
];

export const CategoryPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const filteredProducts = dummyProducts.filter(p => p.category === category);

      // Scroll to top when the component mounts
      useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="category-page">
            <h1>{category} Products</h1>
            <div className="category-products-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div key={product.id} className="product-item" onClick={() => handleClick(product.id)}>
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">{product.price}</p>
                            <p className="product-label">Description:</p>
                            <p className="product-description">{product.description}</p>
                            <p className="product-label">Climescore Rating: <span>{product.rating}</span></p>         
                        </div>
                    ))
                ) : (
                    <p>No products found in this category.</p>
                )}
            </div>
        </div>
    );
};
