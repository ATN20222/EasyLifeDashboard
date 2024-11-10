import React, { useState } from 'react';

function AddCoupon() {
    const [couponData, setCouponData] = useState({
        code: '',
        expiryDate: '',
        status: 'active',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCouponData({ ...couponData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!couponData.code) newErrors.code = 'Coupon code is required';
        if (!couponData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Coupon Added:', couponData);
        }
    };

    return (
        <div className="container-fluid p-4">
            <h1>Add Coupon</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Coupon Code</label>
                    <input type="text" name="code" className="form-control" onChange={handleInputChange} />
                    {errors.code && <div className="text-danger">{errors.code}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Expiry Date</label>
                    <input type="date" name="expiryDate" className="form-control" onChange={handleInputChange} />
                    {errors.expiryDate && <div className="text-danger">{errors.expiryDate}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select name="status" className="form-select" onChange={handleInputChange} value={couponData.status}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Add Coupon</button>
            </form>
        </div>
    );
}

export default AddCoupon;
