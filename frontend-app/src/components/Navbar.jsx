import React, { useState } from "react";
import '../Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="html-container">
        <div className="html-section">
          <div className="html-project">
            <div className="navigation">
              <nav>
                <ul className="nav-type">
                  <Link to="/">
                    <img 
                      src={`${process.env.PUBLIC_URL}/images/logo.png`} 
                      style={{ height: "5rem", marginLeft: "3rem", marginTop: "-1rem" }} 
                      alt="Logo" 
                    />
                  </Link>

                  {/* Hamburger menu icon */}
                  <div className="hamburger-menu" onClick={toggleMenu}>
                    <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                  </div>

                  {/* Links container */}
                  <div className={`useful-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/">
                      <li><a href="https://codepen.io/TomikaBoy/full/LqMpaE" target="_blank" className="active1">Home</a></li>
                    </Link>

                    <Link to="/">
                      <li><a href="https://codepen.io/TomikaBoy/full/LqMpaE" target="_blank" className="active1">About</a></li>
                    </Link>

                    <Link to="/portfolio">
                      <li><a href="https://codepen.io/" target="_blank" className="active2">Portfolio</a></li>
                    </Link>

                    <Link to="/">
                      <li><a href="https://codepen.io/" target="_blank" className="active2">Contact</a></li>
                    </Link>

                    <Link to="/">
                      <li><a href="https://codepen.io/TomikaBoy/full/LqMpaE" target="_blank" className="active1">Testimonials</a></li>
                    </Link>

                    <Link to="/auth">
                      <li><a href="https://w3schools.com/" target="_blank" className="active3">Login</a></li>
                    </Link>
                  </div>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
