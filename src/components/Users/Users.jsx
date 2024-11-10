import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Users() {
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const users = [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
        { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
        // Additional users as needed
    ];

    const handleBanClick = (user) => {
        setSelectedUser(user);
        setShowConfirm(true);
    };

    const confirmBan = () => {
        if (selectedUser) {
            console.log(`User ${selectedUser.name} (ID: ${selectedUser.id}) has been banned.`);
            setShowConfirm(false);
            setSelectedUser(null);
        }
    };

    const cancelBan = () => {
        setShowConfirm(false);
        setSelectedUser(null);
    };

    return (
        <div className="container-fluid p-4">
            <h1 className="mb-4">Users</h1>
            <div className="table-responsive">
                <table className="table table-hover mt-4">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleBanClick(user)}
                                    >
                                        Ban
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Ban</h5>
                                <button type="button" className="btn-close" onClick={cancelBan}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to ban {selectedUser?.name}?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={cancelBan}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={confirmBan}>
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
