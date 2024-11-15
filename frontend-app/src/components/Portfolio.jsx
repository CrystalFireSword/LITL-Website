// Portfolio.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';  // Import the PostCard component
import '../Portfolio.css';
import Carousel from './Carousel';
import AddPostForm from './AddPostForm'; // Import AddPostForm

const Portfolio = () => {
  const [selectedSection, setSelectedSection] = useState(''); // No default section selected
  const [selectedLanguages, setSelectedLanguages] = useState([]); // Default no language filter
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [admin, setAdmin] = useState(null); // Set default to null for clarity
  const [showAddPostForm, setShowAddPostForm] = useState(false); // State for showing the form

  // Fetch user info (for the sake of example)
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user'); // Assume user is stored in localStorage
    if (loggedInUser && JSON.parse(loggedInUser).role === 'admin') {
      setAdmin(true); // Set admin state if logged in as admin
    } else {
      setAdmin(false); // Set admin to false if not logged in as admin
    }
  }, []);

  // Fetch posts based on selected section and language
  useEffect(() => {
    const fetchFilteredPosts = async () => {
      try {
        const params = {};

        if (selectedSection) {
          params.type = selectedSection;
        }

        if (selectedLanguages.length > 0) {
          params.languages = selectedLanguages.join(',');
        }

        const response = await axios.get('http://localhost:5000/api/portfolio', { params });
        setFilteredPosts(response.data);
      } catch (error) {
        console.error('Error fetching filtered posts:', error);
      }
    };

    fetchFilteredPosts();
  }, [selectedSection, selectedLanguages]);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleCheckboxChange = (language) => {
    setSelectedLanguages((prevLanguages) => {
      return prevLanguages.includes(language)
        ? prevLanguages.filter((lang) => lang !== language)
        : [...prevLanguages, language];
    });
  };

  const resetFilters = () => {
    setSelectedSection('');
    setSelectedLanguages([]);
  };

  const handleAddPostClick = () => {
    setShowAddPostForm(true); // Show the form
  };

  const closeAddPostForm = () => {
    setShowAddPostForm(false); // Close the form
  };

  return (
    <>
      <Carousel />
      
      <div className="header-container">
        
        <header>
          <h1>PORTFOLIO NU</h1>
          <p>We showcase our finest work, tailored to meet every client’s need.</p>
        </header>
      </div>
      {admin && (
            <div className="admin-actions" style={{ textAlign: 'center', marginTop: '20px' }}>
              <button className="add-button" onClick={handleAddPostClick}>Add New Post</button>
            </div>
          )}

      <div className="portfolio-page">
        {/* Main Content */}
        <div className="main-content">
          {/* Section Boxes */}
          <div className="sections-container">
            {['Caption', 'Post', 'Design', 'Marketing'].map((section) => (
              <div
                key={section}
                className={`section-box ${selectedSection === section ? 'active' : ''}`}
                onClick={() => handleSectionClick(section)}
              >
                {section}
              </div>
            ))}
          </div>

          {/* Language Filter Below Sections */}
          <div className="language-filter">
            <h3>Filter by Language</h3>
            <div className="language-options">
              {['Tamil', 'Hindi', 'Sanskrit', 'English'].map((language) => (
                <label
                  key={language}
                  className={`language-label ${selectedLanguages.includes(language) ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    value={language}
                    checked={selectedLanguages.includes(language)}
                    onChange={() => handleCheckboxChange(language)}
                  />
                  {language}
                </label>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button className="reset-button" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>

          {/* Admin Add Button (Only if user is logged in and is an admin) */}
          

          {/* Content Display */}
          <div className="section-content">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))
            ) : (
              <p>No posts available for the selected filters.</p>
            )}
          </div>
        </div>
      </div>

      {/* Popup Form */}
      {showAddPostForm && <AddPostForm closeForm={closeAddPostForm} />}
    </>
  );
};

export default Portfolio;
