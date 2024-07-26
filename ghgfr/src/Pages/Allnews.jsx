import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/allnews.css'; // Make sure to create this CSS file

export const Allnews = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

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
    <>
      <h1>All News</h1>
      <div className="news-grid">
        {news.map((item) => (
          <div key={item._id} className="news-item">
            <img src={`https://backend.climescore.com/${item.image}`} alt={item.title} className="news-image" />
            <h2 className="news-title">{item.title}</h2>
            <p className="news-content">{truncateText(item.content)}</p>
            <button onClick={() => handleSeeFullNews(item._id)}>See full news</button>
          </div>
        ))}
      </div>
    </>
  );
};
