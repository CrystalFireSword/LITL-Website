import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Auth from './components/Auth.jsx';
import Admin from './components/Admin.jsx';
import Order from './components/Order.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/auth" element = {<Auth/>}/>
      <Route path = "/dashboard" element = {<Admin/>}/>
      <Route path = "/order-form" element = {<Order/>}/>
      </Routes>
      <Footer/>
    </div>
    
      
   
  );
}

export default App;
