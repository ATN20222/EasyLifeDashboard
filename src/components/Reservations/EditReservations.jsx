import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReservationsService } from '../../Services/Api';
import toast, { Toaster } from 'react-hot-toast';

function EditReservations() {
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
        if (!reservationData.reservationTime) newErrors.reservationTime = 'Reservation Time is required';
        if (!reservationData.reservationStatus) newErrors.reservationStatus = 'Reservation Status is required';
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
                toast.success('Reservation updated successfully');
            } catch (error) {
                console.error('Error updating reservation:', error);
                toast.success('Error updating reservation');

            }
        }
    };

    return (
        <div className="container-fluid p-4">
            <Toaster position="top-right" reverseOrder={false} />
            
            <h1>Edit Reservation</h1>
            <form onSubmit={handleSubmit}>
                {/* Non-editable fields */}
                <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input type="text" className="form-control" value={reservationData.userName} disabled />
                </div>
                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input type="text" className="form-control" value={reservationData.location} disabled />
                </div>
                <div className="mb-3">
                    <label className="form-label">Details</label>
                    <textarea className="form-control" value={reservationData.details} disabled></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Service Name</label>
                    <input type="text" className="form-control" value={reservationData.serviceName} disabled />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-control" value={reservationData.phoneNumber} disabled />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control" value={reservationData.email} disabled />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Reservation Time</label>
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
                    <label className="form-label">Reservation Status</label>
                    <select
                        name="reservationStatus"
                        className="form-select"
                        onChange={handleInputChange}
                        value={reservationData.reservationStatus}
                    >
                        <option value="1">Pending</option>
                        <option value="2">Confirmed</option>
                        <option value="3">Rejected</option>
                    </select>
                    {errors.reservationStatus && <div className="text-danger">{errors.reservationStatus}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
}

export default EditReservations;
