import React from 'react';
import welcomeImage from '../Assets/Images/WelcomeImage (2).svg';
function TopNavbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark TopNavBar">
            <div className="container-fluid">
                <span className="navbar-brand">Welcome Back ! <i className="fa-solid fa-hand TopNavHand"></i>   </span>
                <div className="d-flex align-items-center">
                    <span className='text-white CurrentUser'>
                        <i className="fas fa-user-circle fa-lg me-2 CurrentUserIcon" data-username={'Anton Abdalla'}></i>
                        <span className='CurrentUserName'>Anton Abdalla</span>
                    </span>
                </div>
                
            </div>  
            

        </nav>
    );
}

export default TopNavbar;
