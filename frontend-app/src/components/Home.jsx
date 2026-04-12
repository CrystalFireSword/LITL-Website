import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Popup from "./Popup";
import Carousel from "./Carousel";
import '../App.css';
import { cookies } from "../utils/cookies";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  const checkAdminStatus = () => {
    const loggedInUser = cookies.get('user');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setAdmin(user.role === 'admin');
    }
  };

  const isLoggedIn = () => {
    const loggedInUser = cookies.get('user');
    return loggedInUser !== null;
  };

  useEffect(() => {
    checkAdminStatus();

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
      {showPopup && <Popup onClose={closePopup} />}
    </div>
  );
};

export default Home;
