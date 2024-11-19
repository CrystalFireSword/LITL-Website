import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';  // Import the PostCard component
import '../Portfolio.css';
import Carousel from './Carousel';
import AddPostForm from './AddPostForm'; // Import AddPostForm
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Popup from './Popup'; // Assuming you have a separate Popup component
import UpdateForm from './UpdateForm';

const Portfolio = () => {
  const [selectedSection, setSelectedSection] = useState(''); // No default section selected
  const [selectedLanguages, setSelectedLanguages] = useState([]); // Default no language filter
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [admin, setAdmin] = useState(null); // Set default to null for clarity
  const [showAddPostForm, setShowAddPostForm] = useState(false); // State for showing the form
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup
  const[user , setUser] = useState(null);

  //for showing the update form
  const[showUpdateForm , setShowUpdateForm] = useState(false);
  const[formUpdate , setFormUpdate] = useState(null);

  const navigate = useNavigate(); // Hook to navigate to other pages

  // Fetch user info (for the sake of example)
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user'); // Assume user is stored in localStorage
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      if (user.role === 'admin') {
        setAdmin(true); // Set admin state if logged in as admin
      } else {
        setAdmin(false); // Set admin to false if logged in as non-admin
        setShowPopup(true); 
        setUser(user);// Show popup if the user is not an admin
      }
    } else {
      setAdmin(false); // No user logged in
      setShowPopup(true); // Show popup if no user is logged in
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
    setShowUpdateForm(false);
  };

  //handle update functionality of post
  const handlePostUpdate = (post) => {
    setShowUpdateForm(true);
    setFormUpdate(post);
  }

  const navigateToDashboard = () => {
    // Navigate to the appropriate dashboard based on user role
    if (admin) {
      navigate('/dashboard'); // Admin dashboard route
    } else {
      navigate('/user-dashboard'); // User dashboard route
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>     
    
      <div className="header-container">
        <header>
          
          <h1>PORTFOLIO</h1>
          <p>We showcase our finest work, tailored to meet every client’s need.</p>
        </header>
      </div>

      {admin && (
        <div className="admin-actions" style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="add-button" onClick={handleAddPostClick}>
            Add New Post
          </button>
        </div>
      )}

      {showUpdateForm && (
        <div className="admin-actions" style={{ textAlign: 'center', marginTop: '20px' }}>
        <UpdateForm post = {formUpdate} closeForm={closeAddPostForm}/>
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
    {/* Back to Dashboard Button with Fixed Position */}
    {(admin || user) && ( // Only show if logged in (admin or non-admin)
        <div
          className="back-to-dashboard"
          
        >
          <button
            onClick={navigateToDashboard}
            style={{
              padding: '10px 20px',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              backgroundColor : '#007BFF',
              position : 'fixed',
              zIndex : '1000',
              transform: 'translateX(-50%)',
              marginTop : '150px'
            }}
          >
            Back to Dashboard
          </button>
        </div>
      )}
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

          {/* Content Display */}
          <div className="section-content">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => <PostCard key={post._id} post={post} admin = {admin} onUpdate = {handlePostUpdate} />)
            ) : (
              <p>No posts available for the selected filters.</p>
            )}
        

          </div>
        </div>
      </div>

      {/* Popup Form */}
      {showPopup && <Popup onClose={closePopup} />}

      {/* Add Post Form */}
      {showAddPostForm && <AddPostForm closeForm={closeAddPostForm} />}

          </>
  );
};

export default Portfolio;
