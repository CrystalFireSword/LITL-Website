import React from "react";
import '../App.css';
import {Link} from "react-router-dom";

const Home = () => {
 
    return(
        <div>
        <div className = "volunteer-hub" id = "volunteer-hub">
            <h2 className = "company-name">Lit'L</h2>
            <Link to = "/order-form">
            <button className="button-63">Order now</button>
            </Link>
            
            <div className="carousel-buttons">
                
            </div>
        </div>

        <div className="about-us" id = "aboutus">
        <h2>About Us</h2>
            <p>
            Empowering communities through meaningful connections and service. The platform bridges the gap between passionate individuals and organizations seeking support, creating a network where everyone can contribute to making a difference. Whether focusing on giving back, learning new skills, or connecting with like-minded people, the platform provides tools and opportunities to foster growth and positive impact.

The mission is to offer a seamless and inclusive experience for both volunteers and organizations, promoting a culture of collaboration to build stronger, more vibrant communities through acts of service.
            </p>
        </div>

    </div>
    )
};

export default Home;