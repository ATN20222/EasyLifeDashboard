import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Coupon() {
    const coupons = [
        { id: 1, code: 'SAVE10', expiryDate: '2023-12-31', status: 1 },
        { id: 2, code: 'WELCOME20', expiryDate: '2024-01-15', status: 0 },
        // Additional coupons as needed
    ];

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="m-0">Coupons</h1>
                <NavLink to='/coupons/add' className='btn btn-dark'>Add New</NavLink>
            </div>
            <div className="table-responsive">
                <table className="table table-hover mt-4">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Code</th>
                            <th>Expiry Date</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map(coupon => (
                            <tr key={coupon.id}>
                                <td>{coupon.id}</td>
                                <td>{coupon.code}</td>
                                <td>{coupon.expiryDate}</td>
                                <td>{coupon.status ? 'Active' : 'Inactive'}</td>
                                <td>
                                    <Link to={`/coupons/edit/${coupon.id}`} className="btn btn-warning">
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

export default Coupon;
