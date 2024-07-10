// src/components/CMSForm.js
import React, { useState } from 'react';
import axios from 'axios';

export const Newsform = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [content, setContent] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object to send the form data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('content', content);

        try {
            await axios.post('http://localhost:8080/addnews', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Clear the form after submission
            setTitle('');
            setImage(null);
            setContent('');
            setImagePreview('');
            alert('News added successfully!');
        } catch (error) {
            console.error('Error adding news:', error);
            alert('Failed to add news.');
        }
    };

    // Handle image file selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        // Create a local URL for the image preview
        const fileUrl = URL.createObjectURL(file);
        setImagePreview(fileUrl);
    };

    return (
        <div className="news-form-container">
            <h1>Add News</h1>
            <form onSubmit={handleSubmit} className="news-form">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input
                        id="image"
                        type="file"
                        onChange={handleImageChange}
                        required
                        className="form-control"
                    />
                    {imagePreview && (
                        <div className="image-preview">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="preview-img"
                            />
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows="10"
                        cols="50"
                        className="form-control"
                    />
                </div>
                <button type="submit" className="submit-btn">Add News</button>
            </form>
            <style jsx>{`
                .news-form-container {
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                .news-form {
                    display: flex;
                    flex-direction: column;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                }

                .form-control {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    box-sizing: border-box;
                }

                .image-preview {
                    margin-top: 10px;
                }

                .preview-img {
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }

                .submit-btn {
                    background-color: #007bff;
                    color: #fff;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                }

                .submit-btn:hover {
                    background-color: #0056b3;
                }
            `}</style>
        </div>
    );
};
