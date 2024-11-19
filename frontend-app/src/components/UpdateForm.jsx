import React, { useState, useEffect, useRef } from 'react';
import '../AddPostForm.css'
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';

const UpdateForm = ({ post, closeForm }) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    description: post?.description || '',
    type: post?.type || '',
    language: post?.language || [],
    link: post?.link || '',
  });

  const choicesRef = useRef(null);

  useEffect(() => {
    const element = document.getElementById('choices-multiple-remove-button');
    if (element) {
      // Destroy existing instance if it exists
      if (choicesRef.current) {
        choicesRef.current.destroy();
      }

      // Create new Choices instance
      choicesRef.current = new Choices(element, {
        removeItemButton: true,
        searchResultLimit: 10,
        renderChoiceLimit: -1,
      });

      // Set initial values
      const languageOptions = [
        { value: 'English', label: 'English' },
        { value: 'Hindi', label: 'Hindi' },
        { value: 'Tamil', label: 'Tamil' },
        { value: 'Sanskrit', label: 'Sanskrit' }
      ];

      // Pre-select the languages that exist in formData.language
      element.innerHTML = '';
      languageOptions.forEach(option => {
        const isSelected = formData.language.includes(option.value);
        const optionElement = new Option(option.label, option.value, isSelected, isSelected);
        element.appendChild(optionElement);
      });

      choicesRef.current.init();

      // Handle choices change
      element.addEventListener('change', handleLanguageChange);
    }

    return () => {
      if (choicesRef.current) {
        choicesRef.current.destroy();
      }
      const element = document.getElementById('choices-multiple-remove-button');
      if (element) {
        element.removeEventListener('change', handleLanguageChange);
      }
    };
  }, []); // Run only once on mount

  const handleLanguageChange = (event) => {
    const selectedOptions = event.target.selectedOptions || [];
    const selectedLanguages = Array.from(selectedOptions).map(option => option.value);
    setFormData(prevData => ({
      ...prevData,
      language: selectedLanguages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const apiUrl = 'http://localhost:5000/api';

    try {
      const response = await fetch(`${apiUrl}/portfolio/${post._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Post updated successfully!');
        closeForm();
      } else {
        throw new Error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post.');
    }
  };

  return (
    <div className="add-post-popup">
      <div className="form-container">
        <h2>Update Post</h2>
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
            <button type="submit" className="submit-button">
              Update Post
            </button>
            <button type="button" className="cancel-button" onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;