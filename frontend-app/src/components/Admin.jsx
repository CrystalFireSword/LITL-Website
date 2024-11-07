import React , {useEffect,useState} from "react";
import '../Admin.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//import axios from 'axios';  // To make API calls to your backend


const Admin = () => {

    const[events,setEvents] = useState([]);
    const[selectedEvent,setSelectedEvent] = useState(null);
    const[newDate,setNewDate] = useState(null);

    useEffect(() => {
        const fetchOrders = async() => {
            
        }
    })

    return (
        <div className="main-content">
            {/* Top Bar Section */}
            <div className="header">
                <div className="top-bar">
                    <div className="top-bar-right">
                        <input type="text" placeholder="Search..." />
                        <span className="notifications">🔔</span>
                        <span className="messages">💬</span>
                        <span className="profile">👤 Admin</span>
                    </div>
                </div>
            </div>


            {/* Key Metrics Section */}
            <div id="key-metrics" className="section">
                <div className="key-metrics">
                    <div className="metric">
                        <h3>Total Bookings Today</h3>
                        <p>50</p>
                    </div>
                    <div className="metric">
                        <h3>Revenue Today</h3>
                        <p>$5,000</p>
                    </div>
                    <div className="metric">
                        <h3>Occupancy Rate</h3>
                        <p>85%</p>
                    </div>
                    <div className="metric">
                        <h3>Available Rooms</h3>
                        <p>15</p>
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
                        <h3>Upcoming Bookings</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Guest Name</th>
                                    <th>Check-in Date</th>
                                    <th>Room Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>John Doe</td>
                                    <td>10/12/2024</td>
                                    <td>Deluxe Room</td>
                                    <td><button>Confirm</button></td>
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
                    <p>Calendar goes here...</p>
                </div>
            </div>
        </div>
    );
}

export default Admin;
