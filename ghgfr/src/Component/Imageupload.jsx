import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Imageupload = () => {
  const [image, setImage] = useState(null);
  const [latestImagePath, setLatestImagePath] = useState('');

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      
      // Upload image to backend
      const response = await axios.post('http://localhost:8080/upload', formData);
      
      // Update the latest image path state with the new image path
      setLatestImagePath(response.data.imagePath);
      
      // Clear the selected image
      setImage(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>

      <div>
        <h2>{latestImagePath}</h2>
        <h2>Latest Uploaded Image</h2>
        {<img src={`http://localhost:8080/${latestImagePath}`} alt="Latest Uploaded" />}
      </div>
    </div>
  );
};
