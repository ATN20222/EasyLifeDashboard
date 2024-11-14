import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReservationsService } from '../../Services/Api';

function Reservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        getReservations();
    }, []);

    const getReservations = async () => {
        try {
            const response = await ReservationsService.List();
            setReservations(response.data);
            setLoading(false); 
        } catch (error) {
            console.error('Error fetching reservations:', error);
            setLoading(false); 
        }
    };

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="container-fluid p-4">
            <h1 className="mb-4">Reservations</h1>
            <div className="table-responsive">
                <table className="table table-hover mt-4">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Service Name</th>
                            <th>Client Name</th>
                            <th>Date</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(reservation => (
                            <tr key={reservation.id}>
                                <td>{reservation.id}</td>
                                <td>{reservation.service.nameEn}</td>
                                <td>{reservation.userName}</td>
                                <td>{reservation.reservationTime}</td>
                                <td>
                                    <Link to={`/reservations/edit/${reservation.id}`} className="btn btn-warning">
                                        <i className="fas fa-pen"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Reservations;
