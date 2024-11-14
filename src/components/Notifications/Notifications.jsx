import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NotificationsService } from '../../Services/Api';

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        getNotifications();
    }, []);

    async function getNotifications() {
        try {
            const response = await NotificationsService.List    ();
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="m-0">Notifications</h1>
                <NavLink to="/notifications/add" className="btn btn-dark Center">Add New</NavLink>
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
                                <td>{new Date(notification.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Notifications;
