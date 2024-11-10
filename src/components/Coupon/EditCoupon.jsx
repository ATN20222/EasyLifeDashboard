import React, { useState } from 'react';

function EditCoupon() {
    const [couponData, setCouponData] = useState({
        code: 'DISCOUNT20',  
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
        if (!couponData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Coupon Updated:', couponData);
        }
    };

    return (
        <div className="container-fluid p-4">
            <h1>Edit Coupon</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Coupon Code</label>
                    <input 
                        type="text" 
                        name="code" 
                        className="form-control" 
                        value={couponData.code} 
                        disabled 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Expiry Date</label>
                    <input 
                        type="date" 
                        name="expiryDate"
                        className="form-control" 
                        onChange={handleInputChange} 
                        value={couponData.expiryDate} 
                    />
                    {errors.expiryDate && <div className="text-danger">{errors.expiryDate}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select 
                        name="status" 
                        className="form-select" 
                        onChange={handleInputChange} 
                        value={couponData.status}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
}

export default EditCoupon;
