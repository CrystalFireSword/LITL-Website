import React, { useState } from 'react';
import '../AddPostForm.css'; // Optional, for styling
import Select from 'react-select';

const AddPostForm = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    language: [], // Changed to an array for multi-select
    link: '',
  });

  const options = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'sanskrit', label: 'Sanskrit' }
  ];

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;

    if (name === 'language' && type === 'select-multiple') {
      // Handle multiple selection
      const selectedLanguages = Array.from(selectedOptions, (option) => option.value);
      setFormData((prevData) => ({ ...prevData, language: selectedLanguages }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    try {
      const response = await fetch(`${apiUrl}/portfolio`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Post added successfully!');
        closeForm();
      } else {
        throw new Error('Failed to add post');
      }
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Failed to add post.');
    }
  };

  return (
    <div className="add-post-popup">
      <div className="form-container">
        <h2>Add New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Post">Post</option>
              <option value="Caption">Caption</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

       
         
         

          <div className="form-group">
            <label>Link</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">Add Post</button>
            <button type="button" className="cancel-button" onClick={closeForm}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostForm;
