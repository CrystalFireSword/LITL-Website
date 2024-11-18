import React, { useState, useEffect, useRef } from 'react';
import '../AddPostForm.css'; // Optional, for styling
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css'; // Import Choices.js styles

const AddPostForm = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    language: [], // Array to store selected languages
    link: '',
  });

  const choicesRef = useRef(null); // Ref for the Choices.js instance

  useEffect(() => {
    // Initialize Choices.js for the multi-select
    const element = document.getElementById('choices-multiple-remove-button');
    if (element) {
      choicesRef.current = new Choices(element, {
        removeItemButton: true, // Allow removing items
        searchResultLimit: 10, // Number of search results to display
        renderChoiceLimit: -1, // No limit for rendering choices
      });

      // Handle choices change to sync with formData
      element.addEventListener('change', handleLanguageChange);
    }

    return () => {
      if (choicesRef.current) {
        choicesRef.current.destroy(); // Cleanup Choices.js on unmount
      }
      if (element) {
        element.removeEventListener('change', handleLanguageChange);
      }
    };
  }, []);

  const handleLanguageChange = (event) => {
    const selectedLanguages = Array.from(event.target.selectedOptions, (option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      language: selectedLanguages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const apiUrl = 'http://localhost:5000/api';

    try {
      const response = await fetch(`${apiUrl}/portfolio`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data
      });

      if (response.ok) {
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
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
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
            <label>Languages</label>
            <select
              id="choices-multiple-remove-button"
              placeholder="Select languages"
              multiple
              required
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Tamil">Tamil</option>
              <option value="Sanskrit">Sanskrit</option>
            </select>
          </div>

          <div className="form-group">
            <label>Link</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
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
