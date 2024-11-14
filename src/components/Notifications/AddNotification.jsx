import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { NotificationsService } from '../../Services/Api';
import { useNavigate } from 'react-router-dom';

function AddNotification() {
    const [notificationData, setNotificationData] = useState({
        title: '',
        description: '',
        date:'',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNotificationData({ ...notificationData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!notificationData.title) newErrors.title = 'Title is required';
        if (!notificationData.description) newErrors.description = 'Description is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const now = new Date();
                const formattedDate = now.toLocaleDateString('en-GB').split('/').reverse().join('-');
                const response = await NotificationsService.Add(notificationData,formattedDate);
                toast.success(response.message);
                setTimeout(() => {
                    navigate('/notifications')
                }, 2000);
            } catch (error) {
                toast.error('Error adding notification');
            }
        }
    };

    return (
        <div className="container-fluid p-4">
            <Toaster position="top-right" reverseOrder={false} />
            <h1>Add Notification</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        className="form-control" 
                        onChange={handleInputChange} 
                    />
                    {errors.title && <div className="text-danger">{errors.title}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea 
                        name="description" 
                        className="form-control" 
                        onChange={handleInputChange}
                    ></textarea>
                    {errors.description && <div className="text-danger">{errors.description}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Send Notification</button>
            </form>
        </div>
    );
}

export default AddNotification;
