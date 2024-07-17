import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/allnews.css'; // Make sure to create this CSS file

export const Allnews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend.climescore.com/news');
        setNews(response.data.reverse());
      } catch (error) {
        console.error('Error fetching the news data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
        <h1>All News</h1>
    <div className="news-grid">
      {news.map((item) => (
          <div key={item._id} className="news-item">
          <img src={`https://backend.climescore.com/${item.image}`} alt={item.title} className="news-image" />
          <h2 className="news-title">{item.title}</h2>
          <p className="news-content">{item.content}</p>
        </div>
      ))}
    </div>
      </>
  );
};
