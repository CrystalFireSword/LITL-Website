import React from "react";
import '../App.css';
import { Link } from "react-router-dom";

const Carousel = () => {
    return(
        <div class = "border1">
            <h1>hello</h1>
            <div className = "volunteer-hub" id = "volunteer-hub">
            <h2 className = "company-name">LIT'L</h2>
            <Link to = "/order-form">
            <button className="button-63">Order now</button>
            </Link>
            
            <div className="carousel-buttons">
                
            </div>
        </div>
        </div>
        
    )
}

export default Carousel;