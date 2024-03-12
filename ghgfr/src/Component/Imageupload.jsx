import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Imageupload = () => {
  const [image, setImage] = useState(null);
  const [imagePaths, setImagePaths] = useState([]);

  useEffect(() => {
    // Fetch all uploaded image paths from the backend
    const fetchImagePaths = async () => {
      try {
        const response = await axios.get('http://localhost:8080/images');
        setImagePaths(response.data);
      } catch (error) {
        console.error('Error fetching image paths:', error);
      }
    };

    fetchImagePaths();
  }, []); // Run once on component mount

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
      
      // Update imagePaths state with the new image path
      setImagePaths([imagePaths, response.data.imagePath]);
      console.log(imagePaths[imagePaths.length-1])

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
        <h2>Uploaded Images</h2>
        <div>
          {imagePaths.map((imagePath) => (
            <img key={imagePath} src={`http://localhost:8080/${imagePath}`} alt="Uploaded" />
          ))}
        </div>
      </div>
    </div>
  );
};


