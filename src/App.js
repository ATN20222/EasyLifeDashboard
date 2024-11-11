import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import './Responsive.css';
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
import Reservations from './components/Reservations/Reservations';
import EditReservations from './components/Reservations/EditReservations';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(
        JSON.parse(localStorage.getItem('isAuthenticated')) || false
    );

    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    const handleLogin = () => setIsAuthenticated(true);
    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        window.location.reload();
    };


    useEffect(() => {
        // Define the async function to make the API call
        const fetchData = async () => {
          try {
            const response = await fetch('https://yellowgreen-raccoon-480548.hostingersite.com/api/point/systems',{
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Database-App': 'mind',  // Replace 'mind' with the actual value if needed
                  'Content-Type': 'multipart/form-data',
                },
              });
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const result = await response.json();
            // setData(result); // Set the retrieved data in the component's state
            console.log("API Response:", result); // Log the data
          } catch (error) {
            // setError(error.message); // Set the error message in case of failure
            console.error("Error fetching data:", error);
          }
        };
    
        // Call the function
        fetchData();
      }, []);



    return (
        <Router>
            <div className="d-flex">
                {isAuthenticated && <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} onLogout={handleLogout} />}
                <div className={`${!isAuthenticated ? 'w-100' : `content-area p-3 ${!isCollapsed ? 'expanded' : ''}`}`}>
                    {isAuthenticated && <TopNavbar onLogout={handleLogout} />}
                    <Routes>
                        <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin}/> : <Navigate to="/" />} />

                        <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated}><Home /></PrivateRoute>} />
                        <Route path="/home" element={<PrivateRoute isAuthenticated={isAuthenticated}><Home /></PrivateRoute>} />
                        <Route path="/services" element={<PrivateRoute isAuthenticated={isAuthenticated}><Services /></PrivateRoute>} />
                        <Route path="/services/edit/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><EditService /></PrivateRoute>} />
                        <Route path="/services/add" element={<PrivateRoute isAuthenticated={isAuthenticated}><AddService /></PrivateRoute>} />
                        <Route path="/News" element={<PrivateRoute isAuthenticated={isAuthenticated}><News /></PrivateRoute>} />
                        <Route path="/News/edit/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><EditNews /></PrivateRoute>} />
                        <Route path="/News/add" element={<PrivateRoute isAuthenticated={isAuthenticated}><AddNews /></PrivateRoute>} />
                        <Route path="/Coupons" element={<PrivateRoute isAuthenticated={isAuthenticated}><Coupon /></PrivateRoute>} />
                        <Route path="/Coupons/add" element={<PrivateRoute isAuthenticated={isAuthenticated}><AddCoupon /></PrivateRoute>} />
                        <Route path="/Coupons/edit/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><EditCoupon /></PrivateRoute>} />
                        <Route path="/Users" element={<PrivateRoute isAuthenticated={isAuthenticated}><Users /></PrivateRoute>} />
                        <Route path="/Notifications" element={<PrivateRoute isAuthenticated={isAuthenticated}><Notifications /></PrivateRoute>} />
                        <Route path="/Notifications/add" element={<PrivateRoute isAuthenticated={isAuthenticated}><AddNotification /></PrivateRoute>} />
                        <Route path="/Reservations" element={<PrivateRoute isAuthenticated={isAuthenticated}><Reservations /></PrivateRoute>} />
                        <Route path="/Reservations/Edit/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><EditReservations /></PrivateRoute>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
