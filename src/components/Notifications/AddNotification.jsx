import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast, { Toaster } from 'react-hot-toast';
import { NotificationsService } from '../../Services/Api';
import { useNavigate } from 'react-router-dom';

function AddNotification() {
    const { t } = useTranslation();
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
        if (!notificationData.title) newErrors.title = t('notificationTitle') + ' ' + t('isRequired');
        if (!notificationData.description) newErrors.description = t('notificationMessage') + ' ' + t('isRequired');
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {                
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                const day = String(currentDate.getDate()).padStart(2, '0');
                const hours = String(currentDate.getHours()).padStart(2, '0');
                const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                const seconds = String(currentDate.getSeconds()).padStart(2, '0');
                const fullDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

                console.log(fullDate)


                const response = await NotificationsService.Add(notificationData,fullDate);
                toast.success(response.message);
                setTimeout(() => {
                    navigate('/notifications')
                }, 2000);
            } catch (error) {
                toast.error(t('notificationAddedError'));
            }
        }
    };

    return (
        <div className="container-fluid p-4">
            <Toaster position="top-right" reverseOrder={false} />
            <h1>{t('addNotification')}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">{t('notificationTitle')}</label>
                    <input 
                        type="text" 
                        name="title" 
                        className="form-control" 
                        onChange={handleInputChange} 
                    />
                    {errors.title && <div className="text-danger">{errors.title}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('notificationMessage')}</label>
                    <textarea 
                        name="description" 
                        className="form-control" 
                        onChange={handleInputChange}
                    ></textarea>
                    {errors.description && <div className="text-danger">{errors.description}</div>}
                </div>
                <button type="submit" className="btn btn-primary">{t('sendNotification')}</button>
            </form>
        </div>
    );
}

export default AddNotification;
