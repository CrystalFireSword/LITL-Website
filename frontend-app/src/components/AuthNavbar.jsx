import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../Admin.css';

const AuthNavbar = ({setAdmin}) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user');
        setAdmin(false);
        navigate('/auth');
    }

    return(
        <div className="header">
                <div className="top-bar">
                    <div className="top-bar-right">
                        <Link to = "/dashboard">
                            <span className="profile">👤 Admin</span>
                        </Link>
                        <span className="profile" onClick={handleLogout}>Logout</span>
                    </div>
                </div>
            </div>
    )
};

export default AuthNavbar;