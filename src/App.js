import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import './Responsive.css'
import Services from './components/Services/Services';
import EditService from './components/Services/EditService';
import AddService from './components/Services/AddService';
import News from './components/News/News';
import EditNews from './components/News/EditNews';
import AddNews from './components/News/AddNews';
import Users from './components/Users/Users';
import Home from './components/Home/Home';
import Coupon from './components/Coupon/Coupon';
import EditCoupon from './components/Coupon/EditCoupon';
import AddCoupon from './components/Coupon/AddCoupon';
import AddNotification from './components/Notifications/AddNotification';
import Notifications from './components/Notifications/Notifications';
import TopNavbar from './components/TopNavbar';

function App() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Router>
            
            <div className="d-flex">
                <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                <div className={`content-area p-3 ${!isCollapsed ? 'expanded' : ''}`}>
                    <TopNavbar/>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/services/edit/:id" element={<EditService />} />
                        <Route path="/services/add" element={<AddService />} />

                        <Route path="/News" element={<News />} />
                        <Route path="/News/edit/:id" element={<EditNews />} />
                        <Route path="/News/add" element={<AddNews />} />

                        <Route path="/Coupons" element={<Coupon />} />
                        <Route path="/Coupons/add" element={<AddCoupon />} />
                        <Route path="/Coupons/edit/:id" element={<EditCoupon />} />

                        <Route path="/Users" element={<Users />} />
                        
                        <Route path="/Notifications" element={<Notifications />} />
                        <Route path="/Notifications/add" element={<AddNotification />} />

                        
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
