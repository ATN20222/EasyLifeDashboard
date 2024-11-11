import React from 'react';
import { Link } from 'react-router-dom';

function Reservations() {
    const reservations = [
        { id: 1, serviceName: 'Spa Treatment', clientName: 'John Doe', date: '2024-11-15' },
        { id: 2, serviceName: 'Personal Training', clientName: 'Jane Smith', date: '2024-11-16' },
        // Additional reservations as needed
    ];

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
                                <td>{reservation.serviceName}</td>
                                <td>{reservation.clientName}</td>
                                <td>{reservation.date}</td>
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
