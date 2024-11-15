import React , {useState,useEffect} from "react";
import '../App.css';
import {Link} from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // For styles
import Popup from "./Popup";
import Carousel from "./Carousel";

const Home = () => {

    const[showPopup , setShowPopup] = useState(false);

    useEffect(()=>{
        const timer = setTimeout(() => {
            setShowPopup(true);
        },2000);

        return () => clearTimeout(timer);
    },[]);

    //close the popup
    const closePopup = () => {
        setShowPopup(false);
    }
 
    return(
        <div>
            <Carousel/>
        <div className="about-us" id = "aboutus">
        <h2>About Us</h2>
            <p>
            Empowering communities through meaningful connections and service. The platform bridges the gap between passionate individuals and organizations seeking support, creating a network where everyone can contribute to making a difference. Whether focusing on giving back, learning new skills, or connecting with like-minded people, the platform provides tools and opportunities to foster growth and positive impact.

The mission is to offer a seamless and inclusive experience for both volunteers and organizations, promoting a culture of collaboration to build stronger, more vibrant communities through acts of service.
            </p>
        </div>
        {showPopup && <Popup onClose={closePopup} />}
    </div>
    )
};

export default Home;