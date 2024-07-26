import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/fullnews.css';

export const FullNews = () => {
    const { newsId } = useParams();
    const [news, setNews] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`https://backend.climescore.com/news/${newsId}`);
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, [newsId]);

    if (!news) {
        return <div>Loading...</div>;
    }

    return (
        <div className="news-container">
            <h1 className="news-title">{news.title}</h1>
            <img className="news-image" src={`https://backend.climescore.com${news.image}`} alt={news.title} />
            <p className="news-content">{news.content}</p>
        </div>
    );
};
