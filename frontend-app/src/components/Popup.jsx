import React, { useState } from "react";
import '../App.css';

const Popup = ({ onClose }) => {
    const [mailId, setMailId] = useState(""); // Update the state to mailId

    // Handle input change
    const handleChange = (e) => {
        setMailId(e.target.value); // Setting mailId
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/subscriber", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mailId }), // Send mailId as expected by the backend
            });

            if (response.ok) {
                alert("Successfully subscribed!!");
                setMailId(""); // Clear the input field after success
            } else {
                alert("Error subscribing");
            }
        } catch (error) {
            console.error("Subscription error:", error);
        }
    };

    return (
        <div style={popupOverlayStyle}>
            <div style={popupContentStyle}>
                <h2 style={headingStyle}>
                    Subscribe to Our Website to Get the Latest Updates!
                </h2>
                <p style={messageStyle}>
                    Stay informed with the latest posts, news, and updates directly to your inbox.
                </p>
                <form style={formStyle} onSubmit={handleFormSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={mailId} // Bind the input value to mailId
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <button type="submit" style={submitButtonStyle}>Subscribe</button>
                </form>
                <button onClick={onClose} style={closeButtonStyle}>Close</button>
            </div>
        </div>
    );
};

// Popup Overlay Style
const popupOverlayStyle = {
  position: 'fixed',
  top: 5,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay to focus on the popup
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

// Popup Content Style
const popupContentStyle = {
  backgroundColor: "white",
  padding: '30px',
  borderRadius: '8px', // Removed duplicate borderRadius
  // Removed animation since it's unclear what 'myGradient' refers to
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Single boxShadow for consistency
  width: '350px',
  textAlign: 'center',
};

// Heading Style
const headingStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '15px',
};

// Message Style
const messageStyle = {
  fontSize: '16px',
  marginBottom: '20px',
  lineHeight: '1.5',
};

// Form Style
const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '15px',
};

// Input Style
const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.3s ease-in-out',
};

// Submit Button Style
const submitButtonStyle = {
  padding: '12px 20px',
  backgroundColor: '#28a745', // Green for the subscription button
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.3s',
};

// Close Button Style
const closeButtonStyle = {
  marginTop: '15px',
  padding: '8px 12px',
  backgroundColor: '#f44336', // Red color for close button
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.3s ease-in-out',
};

export default Popup;
