import { Link } from "react-router-dom";
import './Sidebar.css'

function Sidebar({ isCollapsed, setIsCollapsed ,onLogout}) {
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`sidebar bg-dark ${isCollapsed ? 'collapsed' : ''}`}>
            <button onClick={toggleSidebar} className="btn btn-dark toggle-btn">
                <i className={`fas ${isCollapsed ? 'fa-bars' : 'fa-times'}`}></i>
            </button>
            {!isCollapsed ? (
                <div className="sidebar-heading text-center text-white mt-4">EasyLife</div>
            ) : (
                <div className="mt-5 mb-5 h-15"></div>
            )}
            <ul className="nav flex-column mt-4">
                <li className="nav-item">
                    <Link to="/" className={`nav-link text-white ${isCollapsed ? "text-center" : ''}`}>
                        <i className="fas fa-home me-2"></i> <span className={isCollapsed ? 'd-none' : ''}>Home</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/services" className={`nav-link text-white ${isCollapsed ? "text-center" : ''}`}>
                        <i className="fa-solid fa-hand-holding-dollar me-2"></i> <span className={isCollapsed ? 'd-none' : ''}>Services</span>
                    </Link>
                </li>   
                <li className="nav-item">
                    <Link to="/reservations" className={`nav-link text-white ${isCollapsed ? "text-center" : ''}`}>
                        <i className="fa-solid fa-book me-2"></i> <span className={isCollapsed ? 'd-none' : ''}>Rservations</span>
                    </Link>
                </li>   
                <li className="nav-item">
                    <Link to="/news" className={`nav-link text-white ${isCollapsed ? "text-center" : ''}`}>
                        <i className="fa-solid fa-newspaper me-2"></i> <span className={isCollapsed ? 'd-none' : ''}>News</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/users" className={`nav-link text-white ${isCollapsed ? "text-center" : ''}`}>
                        <i className="fa-solid fa-users me-2"></i> <span className={isCollapsed ? 'd-none' : ''}>Users</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/coupons" className={`nav-link text-white ${isCollapsed ? "text-center" : ''}`}>
                        <i className="fa-solid fa-ticket me-2"></i> <span className={isCollapsed ? 'd-none' : ''}>Coupons</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/notifications" className={`nav-link text-white ${isCollapsed ? "text-center" : ''}`}>
                        <i className="fa-solid fa-bell me-2"></i> <span className={isCollapsed ? 'd-none' : ''}>Notifications</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className={`nav-link text-white ${isCollapsed ? "text-center" : ''}`} onClick={onLogout}>
                        <i className="fas fa-sign-in-alt me-2"></i> <span className={isCollapsed ? 'd-none' : ''}>Logout</span>
                    </Link>
                </li>

            </ul>
        </div>
    );
}

export default Sidebar;
