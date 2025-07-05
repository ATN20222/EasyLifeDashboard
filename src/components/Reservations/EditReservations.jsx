import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ReservationsService } from '../../Services/Api';
import toast, { Toaster } from 'react-hot-toast';

function EditReservations() {
    const { t } = useTranslation();
    const { id } = useParams(); // To get the reservation ID from the URL
    const [reservationData, setReservationData] = useState({
        userName: '',
        location: '',
        details: '',
        serviceName: '',
        phoneNumber: '',
        reservationTime: '',
        reservationStatus: '',
        date: '',
        email:'',
    });
    const [errors, setErrors] = useState({});

    // Fetch the reservation data when the component is mounted
    useEffect(() => {
        getReservationData(id);
    }, [id]);

    const getReservationData = async (id) => {
        try {
            const response = await ReservationsService.GetById(id); // Call the API to get the reservation data
            const data = response.data[0]; // Assuming the response contains the data in an array
            setReservationData({
                userName: data.userName,
                location: data.location,
                details: data.details,
                serviceName: data.service.nameEn + " / "+ data.service.nameAr,
                phoneNumber: data.phoneNumber,
                reservationTime: data.reservationTime,
                reservationStatus: data.reservationStatus.id,
                date: data.date,
                email:data.user.email
            });
        } catch (error) {
            console.error('Error fetching reservation data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReservationData({ ...reservationData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!reservationData.reservationTime) newErrors.reservationTime = t('reservationTime') + ' ' + t('isRequired');
        if (!reservationData.reservationStatus) newErrors.reservationStatus = t('reservationStatus') + ' ' + t('isRequired');
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await ReservationsService.updateReservation(id, reservationData); 
                console.log('Reservation Updated:', response);
                // Optionally, show a success message or redirect
                toast.success(t('reservationUpdated'));
            } catch (error) {
                console.error('Error updating reservation:', error);
                toast.error(t('reservationUpdatedError'));

            }
        }
    };

    return (
        <div className="container-fluid p-4">
            <Toaster position="top-right" reverseOrder={false} />
            
            <h1>{t('editReservation')}</h1>
            <form onSubmit={handleSubmit}>
                {/* Non-editable fields */}
                <div className="mb-3">
                    <label className="form-label">{t('userName')}</label>
                    <input type="text" className="form-control" value={reservationData.userName} disabled />
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('location')}</label>
                    <input type="text" className="form-control" value={reservationData.location} disabled />
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('details')}</label>
                    <textarea className="form-control" value={reservationData.details} disabled></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('serviceName')}</label>
                    <input type="text" className="form-control" value={reservationData.serviceName} disabled />
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('customerPhone')}</label>
                    <input type="text" className="form-control" value={reservationData.phoneNumber} disabled />
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('email')}</label>
                    <input type="text" className="form-control" value={reservationData.email} disabled />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">{t('reservationTime')}</label>
                    <input
                        type="datetime-local"
                        name="reservationTime"
                        className="form-control"
                        value={reservationData.reservationTime}
                        onChange={handleInputChange}
                    />
                    {errors.reservationTime && <div className="text-danger">{errors.reservationTime}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('reservationStatus')}</label>
                    <select
                        name="reservationStatus"
                        className="form-select"
                        onChange={handleInputChange}
                        value={reservationData.reservationStatus}
                    >
                        <option value="1">{t('pending')}</option>
                        <option value="2">{t('confirmed')}</option>
                        <option value="3">{t('rejected')}</option>
                    </select>
                    {errors.reservationStatus && <div className="text-danger">{errors.reservationStatus}</div>}
                </div>
                <button type="submit" className="btn btn-primary">{t('save')}</button>
            </form>
        </div>
    );
}

export default EditReservations;
