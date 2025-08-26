import React, { useState } from "react";

const BlogCMS = ({ onAddBlog }) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "",
    description: "",
    views: "",
    image: "",
    link: "#",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.image) {
      alert("Title, Category & Image are required!");
      return;
    }

    onAddBlog({ ...formData, views: Number(formData.views) || 0 });
    setFormData({
      title: "",
      subtitle: "",
      category: "",
      description: "",
      views: "",
      image: "",
      link: "#",
    });
  };

  return (
    <div className="cms-container">
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Blog Subtitle"
          value={formData.subtitle}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Blog Category"
          value={formData.category}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Blog Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="views"
          placeholder="Views"
          value={formData.views}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="text"
          name="link"
          placeholder="Read More Link"
          value={formData.link}
          onChange={handleChange}
        />
        <button type="submit">Add Blog</button>
      </form>

      <style>{`
        .cms-container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .cms-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cms-form input, .cms-form textarea {
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
        .cms-form textarea {
          min-height: 100px;
          resize: vertical;
        }
        .cms-form button {
          background: #1e88e5;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s;
        }
        .cms-form button:hover {
          background: #1565c0;
        }
      `}</style>
    </div>
  );
};

export default BlogCMS;
