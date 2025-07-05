import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UsersService } from '../../Services/Api';
import toast, { Toaster } from 'react-hot-toast';

function Users() {
    const { t } = useTranslation();
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
            toast.success(t('userBanned'));

            getUsers();
        } catch (error) {
            console.error("Error banning user:", error);
            toast.error(t('userBanError'));
        }
        setSelectedUser({});
    };

    const handleUnBan = async (id) => {
        try {
            const response = await UsersService.UnBan(id);
            console.log("User unbanned:", response);
            toast.success(t('userUnbanned'));
            
            getUsers();
        } catch (error) {
            console.error("Error unbanning user:", error);
            toast.error(t('userUnbanError'));
            
        }
        setSelectedUser({});
    };

    const handleConfirmBan = (user) => {
        if (!user.isBanned) {
            setSelectedUser(user);
            setShowConfirm(true);
        } else {
            toast.error(t('userAlreadyBanned'));
        }
    };

    const handleConfirmUnBan = (user) => {
        if (user.isBanned) {
            setSelectedUser(user);
            setShowConfirm(true);
        } else {
            toast.error(t('userNotBanned'));
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

            <h1 className="mb-4">{t('users')}</h1>
            <div className="table-responsive">
                <table className="table table-hover mt-4">
                    <thead>
                        <tr>
                            <th>{t('userName')}</th>
                            <th>{t('userEmail')}</th>
                            <th>{t('userStatus')}</th>
                            <th>{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4">{t('loading')}</td></tr>
                        ) : (
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isBanned ? t('banned') : t('active')}</td>
                                    <td>
                                        {user.isBanned ? (
                                            <button
                                                className="btn btn-success"
                                                onClick={() => handleConfirmUnBan(user)}
                                            >
                                                {t('unban')}
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleConfirmBan(user)}
                                            >
                                                {t('ban')}
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
                                    {selectedUser?.isBanned ? t('unban') : t('ban')} {t('user')}
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    {t('confirmBanUnban')} {selectedUser?.isBanned ? t('unban') : t('ban')}{' '}
                                    {selectedUser?.userName}?
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowConfirm(false)}
                                >
                                    {t('cancel')}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleConfirmAction}
                                >
                                    {t('yes')}
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
