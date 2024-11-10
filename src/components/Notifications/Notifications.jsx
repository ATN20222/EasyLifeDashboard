import React from 'react';
import { NavLink } from 'react-router-dom';

function Notifications() {
    const notifications = [
        { id: 1, title: 'New Feature', description: 'We have released a new feature.', time: '2024-11-10 10:00 AM' },
        { id: 2, title: 'System Update', description: 'System maintenance scheduled.', time: '2024-11-11 08:00 AM' },
        // Additional notifications as needed
    ];

    return (
        <div className="container-fluid p-4">
            {/* <h1 className="mb-4">Notifications</h1> */}
            <div className="d-flex justify-content-between align-items-center">
                <h1 className='m-0'>Notifications</h1>
                <NavLink to='/notifications/add' className='btn btn-dark Center'>Add New</NavLink>
            </div>
            <div className="table-responsive">
                <table className="table table-hover mt-4">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifications.map(notification => (
                            <tr key={notification.id}>
                                <td>{notification.title}</td>
                                <td>{notification.description}</td>
                                <td>{notification.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Notifications;
