import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import OrderPage from './pages/OrderPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Routes>
      <Route path = "/" element = {<HomePage/>}/>
      <Route path = "/auth" element = {<AuthPage/>}/>
      <Route path = "/order-form" element = {<OrderPage/>}/>
      <Route path = "/dashboard" element = {<AdminPage/>}/>
    </Routes>
  );
}

export default App;
