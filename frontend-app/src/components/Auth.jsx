import React, { useState } from "react";
import "../Auth.css";

const Auth = () => {
    const [formData, setFormData] = useState({
        logemail: "",
        logpass: "",
        name: "",
        phone: "",
        signupEmail: "",
        signupPass: "",
    });

    // State to toggle between login and signup
    const [isLogin, setIsLogin] = useState(true);

    // Handles input change
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
                                                <form onSubmit={(e) => e.preventDefault()}>
                                                    <div className="form-group">
                                                        <input
                                                            type="email"
                                                            name="logemail"
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
                                                            name="logpass"
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
