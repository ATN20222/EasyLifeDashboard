import React, { useEffect, useState } from 'react';
import { UsersService } from '../../Services/Api';
import toast, { Toaster } from 'react-hot-toast';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await UsersService.List();
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    const handleBan = async (id) => {
        try {
            const response = await UsersService.Ban(id);
            console.log("User banned:", response);
            toast.success('User Banned for a month');

            getUsers();
        } catch (error) {
            console.error("Error banning user:", error);
            toast.error('Failed to Ban user');
        }
        setSelectedUser({});
    };

    const handleUnBan = async (id) => {
        try {
            const response = await UsersService.UnBan(id);
            console.log("User unbanned:", response);
            toast.success('User unbanned');
            
            getUsers();
        } catch (error) {
            console.error("Error unbanning user:", error);
            toast.error('Failed to Unban user');
            
        }
        setSelectedUser({});
    };

    const handleConfirmBan = (user) => {
        if (!user.isBanned) {
            setSelectedUser(user);
            setShowConfirm(true);
        } else {
            toast.error('User is already banned');
        }
    };

    const handleConfirmUnBan = (user) => {
        if (user.isBanned) {
            setSelectedUser(user);
            setShowConfirm(true);
        } else {
            toast.error('User is not banned');
        }
    };

    const handleConfirmAction = () => {
        if (selectedUser.isBanned===true) {
            console.log("selectedUser",selectedUser);
            handleUnBan(selectedUser.id); 
        } else {
            handleBan(selectedUser.id);
        }
        setShowConfirm(false);
        setSelectedUser(null);
    };

    return (
        <div className="container-fluid p-4">
            <Toaster position="top-right" reverseOrder={false} />

            <h1 className="mb-4">Users</h1>
            <div className="table-responsive">
                <table className="table table-hover mt-4">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4">Loading...</td></tr>
                        ) : (
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isBanned ? 'Banned' : 'Active'}</td>
                                    <td>
                                        {user.isBanned ? (
                                            <button
                                                className="btn btn-success"
                                                onClick={() => handleConfirmUnBan(user)}
                                            >
                                                Unban
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleConfirmBan(user)}
                                            >
                                                Ban
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {selectedUser?.isBanned ? 'Unban' : 'Ban'} User
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Are you sure you want to {selectedUser?.isBanned ? 'unban' : 'ban'}{' '}
                                    {selectedUser?.userName}?
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowConfirm(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleConfirmAction}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Users;
