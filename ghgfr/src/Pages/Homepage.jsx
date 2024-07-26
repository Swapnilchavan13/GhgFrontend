import React, { useEffect, useState } from 'react';
import '../styles/homepage.css';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

export const Homepage = () => {
    const navigate = useNavigate();

    const [newsData, setNewsData] = useState([]);

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

    const handleCategoryClick = (category) => {
        navigate(`/category/${category}`);
    };
    
    const handleClick = (productId) => {
        navigate(`/product/${productId}`);
    };
    
    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://backend.climescore.com/news');
                setNewsData(response.data.reverse().slice(0, 4));
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    const morenews = () => {
        navigate('/allnews');
    };

    const handleSeeFullNews = (newsId) => {
        navigate(`/news/${newsId}`);
    };
    const truncateText = (text) => {
        const words = text.split(' ');
        if (words.length <= 10) {
            return text;
        }
        return words.slice(0, 10).join(' ') + '...';
    };

    return (
        <div>
            <div id='threeimgdiv'>
                <div data-aos="flip-right">
                    <img src="https://nettzero.world/wp-content/uploads/2024/02/Group-218-1-1.png" alt="" />
                    <ul>
                        <h2>What We Do</h2>
                        <p>We have enterprise grade technology, globally validated processes & qualified people to help organisations with:</p>
                        <li>Conducting Climate Literacy Programs that are thorough & bespoke</li>
                        <li>GHG Accounting & Emissions Management across Scope 1, 2 and 3</li>
                        <li>Running impact driven EPR & Plastics Programs</li>
                        <li>Purchasing Carbon Credits that is genuine, validated and hand-picked</li>
                        <li>Developing Carbon Credit Programs – in the area of GHG Removal – from concept to monetisation </li>
                    </ul>
                </div>
                <div data-aos="flip-right">
                    <img src="https://nettzero.world/wp-content/uploads/2024/02/Rectangle-139-2-1.png" alt="" />
                    <ul>
                        <h2>Who Are We For</h2>
                        <p>Sustainability & Climate Change is a movement that requires everyone to participate in – right now. NettZero works with:</p>
                        <li>Organisations that wish to become sustainable in a thorough & globally recognised manner – with focus on Carbon Neutrality & Net Zero</li>
                        <li>Local Administrations that need sustainability & development programs implemented in their areas</li>
                        <li>Impact Projects that need to earn Carbon credits, find sponsors & get financial support</li>
                        <li>Individuals who want to make a positive impact</li>
                        <li>Climate Innovators & Ideators who need a channel to launch</li>
                    </ul>
                </div>
                <div data-aos="flip-right">
                    <img src="https://nettzero.world/wp-content/uploads/2024/02/Rectangle-138-3.png" alt="" />
                    <ul>
                        <h2>How We May Align</h2>
                        <p>If any of these statements describe you, we can help you with the solutions you need:</p>
                        <li> I want my organisation to move towards Carbon Neutrality and Net Zero in a scientific, scalable & globally recognised manner – while optimising supply chain emissions</li>
                        <li>I want my organisation and team members to become Climate Literate  in a thorough & action oriented manner</li>
                        <li>I am a producer who wants to transition to a circular economy and deliver on my EPR goals</li>
                        <li>I am an individual and want to make a positive difference to the Climate Change movement and individually become Carbon Neutral</li>
                    </ul>
                </div>
            </div>

            <div id='hospityality'>
                <h1>Our Customers</h1>
                <div className='hospityalitydiv' data-aos="slide-up">
                    <h2></h2>
                    <div className='logos'>
                        <img data-aos="slide-left" src="https://i.postimg.cc/cCSLJk2F/Whats-App-Image-2024-07-13-at-12-32-44-AM-1.jpg" alt="" />
                        <img data-aos="slide-right" src="https://i.postimg.cc/sXLBRtWj/Whats-App-Image-2024-07-13-at-12-21-04-AM.jpg" alt="" />
                        <img data-aos="slide-left" src="https://i.postimg.cc/s22M7Lnx/Whats-App-Image-2024-07-13-at-12-32-47-AM.jpg" alt="" />
                        <img data-aos="slide-right" src="https://i.postimg.cc/MG60nd2K/Whats-App-Image-2024-07-13-at-12-32-44-AM.jpg" alt="" />
                        <img data-aos="slide-left" src="https://i.postimg.cc/9MtryjG6/Whats-App-Image-2024-07-13-at-12-32-45-AM-2.jpg" alt="" />
                        <img data-aos="slide-right" src="https://i.postimg.cc/rwL3PXWn/Whats-App-Image-2024-07-13-at-12-32-45-AM.jpg" alt="" />
                        <img data-aos="slide-left" src="https://i.postimg.cc/85rbGsgh/Whats-App-Image-2024-07-13-at-12-32-45-AM-1.jpg" alt="" />
                        <img data-aos="slide-right" src="https://i.postimg.cc/xj5PSwWp/Whats-App-Image-2024-07-13-at-12-32-46-AM.jpg" alt="" />
                    </div>
                </div>

                <div className='hospityalitydiv2' data-aos="fade-left">
                    <h1>Offering for Hospitality Sector</h1>
                    <div className='hdiv21'>
                        <div>
                            <img src="https://i.postimg.cc/KYqYb7KX/hospitalirt2.jpg" alt="" />
                            <h3>Emissions Quantification & Carbon Neutrality</h3>
                            <p>At NettZero, we empower the hospitality sector to accurately compute and quantify their emissions and offset them. Our comprehensive emissions quantification service enables hotels, resorts, and other hospitality businesses to gain a clear understanding of their carbon footprint. By leveraging the advanced ClimeScore dashboard, we provide precise and actionable data to track the emissions across the entire value chain within the sector. This helps businesses identify opportunities for emission reductions, enhancing their sustainability goals and operational efficiency. Through a combination of reducing emissions and investing in high-quality carbon offset projects, we assist businesses in achieving a net-zero carbon footprint.</p>
                        </div>
                        <div>
                            <img src="https://i.postimg.cc/MKDdzXY0/hospitality1.jpg" alt="" />
                            <h3>Carbon Credit Creation Programs </h3>
                            <p>NettZero offers an innovative Carbon Credit Creation service tailored for the hospitality industry. Through our service, hotels and resorts can transform their sustainability efforts into valuable carbon credits by utilising biochar production. By implementing and documenting verifiable biochar production projects, businesses can generate carbon credits that can be traded or sold in carbon markets. This not only contributes to global climate change mitigation efforts but also creates a potential revenue stream, turning sustainability initiatives into tangible economic benefits.
                            </p>
                        </div>
                        <div>
                            <img src="https://i.postimg.cc/6QdDLBXM/hospitality3.jpg" alt="" />
                            <h3>Sustainable Sourcing</h3>
                            <p>NettZero is dedicated to helping the hospitality sector embrace sustainable sourcing practices. Our comprehensive Sustainable Sourcing service supports hotels, resorts, and other hospitality businesses in their journey to procure goods and services responsibly. By partnering with suppliers who prioritise environmental stewardship and ethical practices, we ensure that our clients can reduce their environmental impact and promote social responsibility. From sustainable food and beverage options to eco-friendly amenities, we assist businesses in integrating sustainable sourcing into their operations, enhancing their commitment to a greener future. </p>                        </div>
                    </div>
                </div>

                <div className='hospityalitydiv2' data-aos="slide-right">
                    <h1>Offerings for Academic Sector</h1>
                    <div className='hdiv21'>
                        <div>
                            <img src="https://i.postimg.cc/rmyMDDr1/s2.jpg" alt="" />
                            <h3>Emissions Quantification for Academic Institutions</h3>
                            <p>NettZero offers a specialised Emissions Quantification service designed for academic institutions to accurately measure and understand their carbon footprint. Using advanced ClimeScore dashboard technology, we provide precise data that helps universities and colleges identify sources of emissions and opportunities for reduction. Our comprehensive approach supports institutions in achieving their sustainability goals, enhancing their environmental stewardship and demonstrating leadership in climate action within the academic community.
                            </p>
                        </div>
                        <div>
                            <img src="https://i.postimg.cc/k5Xp8KTg/s1.jpg" alt="" />
                            <h3>Achieving Carbon Neutrality in Academic Institutions</h3>
                            <p>At NettZero, we provide tailored strategies to help universities and colleges measure, reduce, and offset their carbon emissions effectively. Through these efforts, academic institutions not only demonstrate their commitment to environmental responsibility but also inspire and educate future generations on the importance of sustainable practices. 
                             </p>
<p>

                             We take pride in supporting India's first carbon neutral campus, demonstrating leadership in environmental sustainability within the academic sector. Partnering with us ensures that academic institutions can lead by example in climate action, fostering a sustainable future for generations to come.
</p>
                        </div>
                        <div>
                            <img src="https://i.postimg.cc/85yDMTRq/s3.jpg" alt="" />
                            <h3>Course Development & Delivery</h3>
                            <p>We  assist academic institutions in developing a cutting-edge course in sustainability aimed at nurturing the next generation of leaders. Our expertise enables universities and colleges to craft a curriculum that equips students with the knowledge and skills needed to tackle global challenges effectively. From climate change resilience to sustainable development practices and environmental policy, our curriculum development services integrate rigorous academic content with practical applications. Through collaborative workshops and expert guidance, we empower institutions to inspire and educate future leaders who will drive positive change towards a sustainable future.</p>
                        </div>
                    </div>
                </div>
            </div>

             <div id='Marketplacediv'>
            <h1>Climescore Marketplace</h1>

            <div data-aos="flip-down" id='marketdiv1'>
                <div onClick={() => handleCategoryClick('Kitchen')}>
                    <h2>Kitchen</h2>
                </div>
                <div onClick={() => handleCategoryClick('Bath & Toiletries')}>
                    <h2>Bath & Toiletries</h2>
                </div>
                <div onClick={() => handleCategoryClick('Linen & Cloth')}>
                    <h2>Linen & Cloth</h2>
                </div>
                <div onClick={() => handleCategoryClick('Consumables & Housekeeping')}>
                    <h2>Consumables & Housekeeping</h2>
                </div>
                <div onClick={() => handleCategoryClick('Furniture')}>
                    <h2>Furniture</h2>
                </div>
                <div onClick={() => handleCategoryClick('Others')}>
                    <h2>Others</h2>
                </div>
            </div>

            <div id='marketproducts'>
                {dummyProducts.map((product) => (
                    <div data-aos="flip-right" key={product.id} className="product-item" onClick={() => handleClick(product.id)}>
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">{product.price}</p>
                        <p className="product-label">Description:</p>
                        <p className="product-description">{product.description}</p>
                        <p className="product-label">Climescore Rating: <span>{product.rating}</span></p>
                    </div>
                ))}
            </div>
        </div>


            <div id='Newsdiv'>
                <h1>Climescore NEWS</h1>
                <div id='climescore' data-aos="zoom-in">
                    {newsData.map((news) => (
                        <div className='newsnews' key={news._id}>
                            <div className='cproduct'>
                                <img src={`https://backend.climescore.com${news.image}`} alt="" />
                                <div>
                                    <h4>{news.title}</h4>
                                    <p style={{ whiteSpace: 'pre-wrap' }}>{truncateText(news.content)}</p>
                                    <button onClick={() => handleSeeFullNews(news._id)}>See full news</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={morenews}>More News</button>
            </div>
        </div>
    );
};
