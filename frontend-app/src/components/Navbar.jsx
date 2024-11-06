import React from "react";
import '../Navbar.css';
import {Link} from 'react-router-dom'

const Navbar = () => {
    return(
        <div>
        <div className="html-container">
    <div className="html-section">
      <div className="html-project">
        <div className="navigation">
        <li><a href="https://codepen.io/" target="_blank" className="email">litl@gmail.com</a></li>
          <nav>
            <ul className="nav-type">
            <li><a href="https://codepen.io/TomikaBoy/full/LqMpaE" target="_blank" className="heading">Lit'l</a></li>
            <div className="useful-links">
                <Link to = "/">
                <li><a href="https://codepen.io/TomikaBoy/full/LqMpaE" target="_blank" className="active1">Home</a></li>
                </Link>
            
              <li><a href="https://codepen.io/TomikaBoy/full/LqMpaE" target="_blank" className="active1">About</a></li>
              <li><a href="https://codepen.io/" target="_blank" className="active2">Services</a></li>
              <li><a href="https://codepen.io/" target="_blank" className="active2">Contact</a></li>
              <li><a href="https://codepen.io/TomikaBoy/full/LqMpaE" target="_blank" className="active1">Testimonials</a></li>
              <Link to = "/auth">
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

    )
};

export default Navbar;