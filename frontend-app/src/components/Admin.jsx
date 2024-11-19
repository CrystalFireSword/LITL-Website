import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../Admin.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Admin = () => {
    const navigate = useNavigate();
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the 'admin' item in local storage is set to 'loggedin'
        const adminStatus = localStorage.getItem('admin');
        
        if (adminStatus) {
            setIsAdminLoggedIn(true);
        } else {
            navigate('/auth'); // Redirect to the login page if not logged in
        }
    }, [navigate]);

    if (!isAdminLoggedIn) {
        return null; // Don't render the component if the admin is not logged in
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
    }

    return (
        <div className="main-content">
            {/* Top Bar Section */}
            <div className="header">
                <div className="top-bar">
                    <div className="top-bar-right">
                        <span className="profile">👤 Admin</span>
                        <Link to="/">
                            <span className="profile" onClick={handleLogout}>Logout</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="section1">
            <div id="key-metrics" className="section">
                <div className="key-metrics">
                    <div className="metric">
                        <h3>Number of Upcoming orders</h3>
                        <p>50</p>
                    </div>
                    <div className="metric">
                        <h3>Number of delivered orders</h3>
                        <p>5,000</p>
                    </div>
                    <div className="metric">
                        <h3>No of forms to be reviewed</h3>
                        <p>85%</p>
                    </div>
                </div>
            </div>

            {/* Charts and Tables Section */}
            <div id="charts-tables" className="section">
                <div className="charts-tables">
                    <div className="chart">
                        <h3>Booking Overview</h3>
                        <canvas id="bookingChart"></canvas>
                    </div>
                    <div className="table">
                        <h3>Upcoming Orders</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Client Name</th>
                                    <th>Expected Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>John Doe</td>
                                    <td>10/12/2024</td>
                                    <td>Deluxe Room</td>
                                    <td><button>Accept</button> <button>Decline</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Booking Calendar Section */}
            <div id="booking-calendar" className="section">
                <div className="calendar">
                    <h3>Booking Calendar</h3>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        editable={true}
                    />
                </div>
            </div>
            </div>
            {/* Key Metrics Section */}
            
        </div>
    );
};

export default Admin;
