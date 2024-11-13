import React, { useState } from 'react';
import './Services.css';
import axios from 'axios';
import { ServicesService } from '../../Services/Api';

function AddService() {
    const [serviceData, setServiceData] = useState({
        image: null,
        titleEN: '',
        titleAR: '',
        descriptionEN: '',
        descriptionAR: '',
        status: true,
        price: '',
        imageUrl:'imageurl',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setServiceData({ ...serviceData, [name]: value });
    };

    const handleImageChange = (e) => {
        setServiceData({ ...serviceData, image: e.target.files[0] });
    };

    const validate = () => {
        const newErrors = {};
        if (!serviceData.image) newErrors.image = 'Image is required';
        if (!serviceData.titleEN) newErrors.titleEN = 'Title (EN) is required';
        if (!serviceData.titleAR) newErrors.titleAR = 'Title (AR) is required';
        if (!serviceData.descriptionEN) newErrors.descriptionEN = 'Description (EN) is required';
        if (!serviceData.descriptionAR) newErrors.descriptionAR = 'Description (AR) is required';
        if (!serviceData.price) newErrors.price = 'Price is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                

                const response = await ServicesService.Add(serviceData);
                console.log('Service Added:', response);
            } catch (error) {
                console.error('Error adding service:', error);
            }
        }
    };

    // Function to send the form data to the backend
    const addService = async (formData) => {
        try {
            const response = await axios.post('/api/services', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Make sure the backend handles FormData
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding service:', error);
            throw new Error(error.response?.data?.message || 'Error adding service');
        }
    };

    return (
        <div className="container-fluid p-4">
            <h1>Add Service</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Service Image</label>
                    <input type="file" className="form-control" onChange={handleImageChange} />
                    {errors.image && <div className="text-danger">{errors.image}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Title (EN)</label>
                    <input type="text" name="titleEN" className="form-control" onChange={handleInputChange} />
                    {errors.titleEN && <div className="text-danger">{errors.titleEN}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Title (AR)</label>
                    <input type="text" name="titleAR" className="form-control" onChange={handleInputChange} />
                    {errors.titleAR && <div className="text-danger">{errors.titleAR}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Description (EN)</label>
                    <textarea name="descriptionEN" className="form-control" onChange={handleInputChange}></textarea>
                    {errors.descriptionEN && <div className="text-danger">{errors.descriptionEN}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Description (AR)</label>
                    <textarea name="descriptionAR" className="form-control" onChange={handleInputChange}></textarea>
                    {errors.descriptionAR && <div className="text-danger">{errors.descriptionAR}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        onChange={handleInputChange}
                        value={serviceData.price}
                    />
                    {errors.price && <div className="text-danger">{errors.price}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        name="status"
                        className="form-select"
                        onChange={handleInputChange}
                        value={serviceData.status}
                    >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Add Service</button>
            </form>
        </div>
    );
}

export default AddService;
