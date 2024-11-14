import React, { useEffect, useState } from 'react';
import welcomeImage from '../Assets/Images/WelcomeImage (2).svg';
function TopNavbar() {
    const [name , setName] = useState('');
    useEffect(()=>{
        setName(localStorage.getItem('Name'));
    },[name]);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark TopNavBar">
            <div className="container-fluid">
                <span className="navbar-brand">Welcome Back ! <i className="fa-solid fa-hand TopNavHand"></i>   </span>
                <div className="d-flex align-items-center">
                    <span className='text-white CurrentUser'>
                        <i className="fas fa-user-circle fa-lg me-2 CurrentUserIcon" data-username={name}></i>
                        <span className='CurrentUserName'>{name}</span>
                    </span>
                </div>
                
            </div>  
            

        </nav>
    );
}

export default TopNavbar;
