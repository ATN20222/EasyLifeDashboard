import React, { useState } from 'react';

function AddNotification() {
    const [notificationData, setNotificationData] = useState({
        title: '',
        description: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Notification Added:', notificationData);
        }
    };

    return (
        <div className="container-fluid p-4">
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
