import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Auth from './components/Auth.jsx';
import Admin from './components/Admin.jsx';
import Order from './components/Order.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Portfolio from './components/Portfolio.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import Testimonials from "./components/Testimonials.jsx";
import AuthNavbar from './components/AuthNavbar.jsx';
import { useEffect, useState } from 'react';
import './Admin.css';
function App() {
  
  const[isAdmin , setAdmin] = useState(false);

  useEffect(() => {
    const checkUserRole = () => {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setAdmin(parsedUser.role === 'admin');
      } else {
        setAdmin(false); // Reset if no user found
      }
    }
  },[]);

  const handleRoleUpdate = (role) => {
    setAdmin(role === "admin")
  }

  const handleLogout = () => {
    localStorage.clear();
    setAdmin(false);
  }

  return (
    <div>
      <Navbar/>
      {isAdmin && <AuthNavbar setAdmin = {setAdmin}/>}
      <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/auth" element = {<Auth onRoleUpdate = {handleRoleUpdate}/>}/>
      <Route path = "/dashboard" element = {<Admin/>}/>
      <Route path = "/order-form" element = {<Order/>}/>
      <Route path = "/portfolio" element = {<Portfolio/>}/>
      <Route path = "/update" element = {<UpdateForm/>}/>
      <Route path = "/reviews" element = {<Testimonials/>}/>
      </Routes>
      <Footer/>
    </div>     
  );
}

export default App;
