import React, { useState } from 'react';

function EditReservations() {
    const [reservationData, setReservationData] = useState({
        userName: 'John Doe',
        location: 'Main Branch',
        details: 'Spa treatment for relaxation',
        serviceName: 'Spa Treatment',
        phoneNumber: '+1234567890',
        reservationTime: '2024-11-15 10:00 AM',
        reservationStatus: 'Pending',
        date: '2024-11-15'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReservationData({ ...reservationData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Reservation Updated:', reservationData);
    };

    return (
        <div className="container-fluid p-4">
            <h1>Edit Reservation</h1>
            <form onSubmit={handleSubmit}>
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
                    <label className="form-label">Reservation Time</label>
                    <input type="text" className="form-control" value={reservationData.reservationTime} disabled />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input 
                        type="date" 
                        name="date" 
                        className="form-control" 
                        onChange={handleInputChange} 
                        value={reservationData.date} 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Reservation Status</label>
                    <select 
                        name="reservationStatus" 
                        className="form-select" 
                        onChange={handleInputChange} 
                        value={reservationData.reservationStatus}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
}

export default EditReservations;
