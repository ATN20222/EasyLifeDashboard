import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Services() {
    const services = [
        { id: 1, title: 'Service 1', price: '$100' ,status:0 },
        { id: 2, title: 'Service 2', price: '$200' ,status:1 },
        // Additional services as needed
    ];

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className='m-0'>Services</h1>
                <NavLink to='/services/add' className='btn btn-dark Center'>Add New</NavLink>
            </div>
            <div className="table-responsive">
                <table className="table table-hover mt-4">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service.id}>
                                <td>{service.title}</td>
                                <td>{service.price}</td>
                                <td>{service.status?'Active':'In Active'}</td>
                                <td>
                                    <Link to={`/services/edit/${service.id}`} className="btn btn-warning">
                                        <i className="fas fa-pen"></i>
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </div>
    );
}

export default Services;
