import React, { useEffect, useState } from "react";
import "../Auth.css";
import { useNavigate } from "react-router-dom";
import FullCalendar from '@fullcalendar/react';  //to use calender
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Auth = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        signupEmail: "",
        signupPass: "",
    });
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [newDate, setNewDate] = useState(null);

    /*useEffect(() => {
        const fetchOrders = async() => {
            try{
                const response = await axios.get('')
            }
        }
    })*/

    // State to toggle between login and signup
    const [isLogin, setIsLogin] = useState(true);

    // Handle login data
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    // Handles input change for signup form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Toggle between login and signup form
    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    // Set the login data
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    // Function to handle login
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'PUT', // Use POST instead of PUT for login
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });
            console.log("response", response);

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);

                // Navigate based on user role
                if (data.role === "admin") {
                    navigate('/dashboard');
                    localStorage.setItem("admin","loggedin");
                } else if (data.role === "user") {
                    navigate('/userdash');
                }
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="section">
            <div className="container">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <input
                                type="checkbox"
                                className="checkbox"
                                id="reg-log"
                                checked={!isLogin}
                                onChange={toggleForm}
                            />
                            <label htmlFor="reg-log"></label>
                            <div className="card-3d-wrap mx-auto">
                                <div className={`card-3d-wrapper ${isLogin ? "" : "rotate"}`}>
                                    <div className="card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Log In</h4>
                                                <form onSubmit={handleLogin}>
                                                    <div className="form-group">
                                                        <input
                                                            type="email"
                                                            name="email"  // Changed to match loginData
                                                            className="form-style"
                                                            placeholder="Your Email"
                                                            onChange={handleLoginChange}
                                                            autoComplete="off"
                                                        />
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="password"
                                                            name="password"  // Changed to match loginData
                                                            className="form-style"
                                                            placeholder="Your Password"
                                                            onChange={handleLoginChange}
                                                            autoComplete="off"
                                                        />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <button type="submit" className="btn mt-4">Submit</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Sign Up</h4>
                                                <form onSubmit={(e) => e.preventDefault()}>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            className="form-style"
                                                            placeholder="Your Name"
                                                            onChange={handleInputChange}
                                                            autoComplete="off"
                                                        />
                                                        <i className="input-icon uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="number"
                                                            name="phone"
                                                            className="form-style"
                                                            placeholder="Your Phone"
                                                            onChange={handleInputChange}
                                                            autoComplete="off"
                                                        />
                                                        <i className="input-icon uil uil-phone"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="email"
                                                            name="signupEmail"
                                                            className="form-style"
                                                            placeholder="Your Email"
                                                            onChange={handleInputChange}
                                                            autoComplete="off"
                                                        />
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="password"
                                                            name="signupPass"
                                                            className="form-style"
                                                            placeholder="Your Password"
                                                            onChange={handleInputChange}
                                                            autoComplete="off"
                                                        />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <button type="submit" className="btn mt-4">Submit</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
