import React, { useState, useEffect } from "react";
import '../App.css';
import { Link, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // For styles
import Popup from "./Popup";
import Carousel from "./Carousel";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [admin, setAdmin] = useState(null); // Default to null for clarity
  const navigate = useNavigate(); // Hook to navigate

  // Check if the user is an admin by reading from localStorage
  const checkAdminStatus = () => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setAdmin(user.role === 'admin'); // Set the admin state based on user role
    }
  };

  const isLoggedIn = () => {
    const loggedInUser = localStorage.getItem('user'); // Check if a user is logged in
    return loggedInUser !== null; // If user exists in localStorage, they are logged in
  };

  useEffect(() => {
    checkAdminStatus(); // Check admin status on component mount

    if (!admin) { // Only show popup if user is not admin
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [admin]); // Add admin state as dependency to re-run the effect if admin changes

  const navigateToDashboard = () => {
    // Navigate to the appropriate dashboard based on user role
    if (admin) {
      navigate('/dashboard'); // Admin dashboard route
    } else {
      navigate('/user-dashboard'); // User dashboard route
    }
  };

  // Close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <Carousel />
      <div className="about-us" id="aboutus">
        <h2>About Us</h2>
        <p>
          Empowering communities through meaningful connections and service. The platform bridges the gap between passionate individuals and organizations seeking support, creating a network where everyone can contribute to making a difference. Whether focusing on giving back, learning new skills, or connecting with like-minded people, the platform provides tools and opportunities to foster growth and positive impact.

          The mission is to offer a seamless and inclusive experience for both volunteers and organizations, promoting a culture of collaboration to build stronger, more vibrant communities through acts of service.
        </p>
      </div>

      {/* Display "Back to Dashboard" button if the user is logged in */}
      {isLoggedIn() && (
        <div
          className="back-to-dashboard"
          style={{
            position: 'fixed',
            bottom: '20px',  // Positioned at the bottom of the screen
            left: '50%',     // Centered horizontally
            transform: 'translateX(-50%)', // Perfect centering
            zIndex: 1000,    // Ensure the button is on top of other elements
          }}
        >
          <button
            onClick={navigateToDashboard}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Back to Dashboard
          </button>
        </div>
      )}

      {showPopup && <Popup onClose={closePopup} />}
    </div>
  );
};

export default Home;
