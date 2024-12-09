import React, { useEffect, useState } from "react";
import "../Testimonials.css"; // Import the CSS for styling
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import Font Awesome icons
import AddTestimonial from "./AddTestimonial";
import axios from "axios";

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [currentReview, setCurrentReview] = useState(0);
    const [isAdmin, setAdmin] = useState(false);
    const [showForm, setShow] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            const parsedUser = JSON.parse(user);
            if (parsedUser.role === "admin") {
                setAdmin(true);
            }
        }
    }, []);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/reviews");
                console.log(response.data);
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, []); // Add the dependency array to prevent the fetch function from running repeatedly.

    const nextReview = () => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    };

    const handleTestimonialForm = () => {
        setShow(true);
    };

    const closePopup = () => {
        setShow(false);
    };

    const review = reviews[currentReview];

    return (
        <div className="content">
            <h1>Hello</h1>
            {isAdmin && (
                <button className="addtest" onClick={handleTestimonialForm}>
                    Add testimonial
                </button>
            )}
            {showForm && <AddTestimonial handleClose={closePopup} />}
            <div className="testimonials-container">
                <h1>Testimonials</h1>
                <div className="testimonial-flex-container">
                    {/* Left Arrow */}
                    <button onClick={prevReview} className="arrow-btn prev-btn">
                        <FaChevronLeft />
                    </button>

                    {/* Testimonial Content */}
                    {review ? (
                        <div className="testimonial-card">
                            <div className="testimonial-avatar"></div>
                            <div className="testimonial-content">
                                <h3>{review.name}</h3>
                                <p className="testimonial-date">{review.date}</p>
                                <p>{review.content}</p>
                                <div className="testimonial-rating">
                                    {Array.from({ length: review.rating }, (_, index) => (
                                        <span key={index}>&#9733;</span> // Star icon
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>No testimonials available.</p>
                    )}

                    {/* Right Arrow */}
                    <button onClick={nextReview} className="arrow-btn next-btn">
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
