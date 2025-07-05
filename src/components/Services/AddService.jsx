import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Services.css';
import axios from 'axios';
import { ServicesService } from '../../Services/Api';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function AddService() {
    const { t } = useTranslation();
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
        if (!serviceData.image) newErrors.image = t('serviceImage') + ' ' + t('isRequired');
        if (!serviceData.titleEN) newErrors.titleEN = t('serviceName') + ' (EN) ' + t('isRequired');
        if (!serviceData.titleAR) newErrors.titleAR = t('serviceName') + ' (AR) ' + t('isRequired');
        if (!serviceData.descriptionEN) newErrors.descriptionEN = t('serviceDescription') + ' (EN) ' + t('isRequired');
        if (!serviceData.descriptionAR) newErrors.descriptionAR = t('serviceDescription') + ' (AR) ' + t('isRequired');
        if (!serviceData.price) newErrors.price = t('servicePrice') + ' ' + t('isRequired');
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {


                const response = await ServicesService.Add(serviceData);
                if(response.status === true){
                    toast.success(t('serviceAdded'));   
                    navigate('/services');
                }
            } catch (error) {
                toast.error(t('serviceAddedError'));
            }
        }
    };


    return (
        <div className="container-fluid p-4">   
            <h1>{t('addService')}</h1>
            <Toaster position="top-right" reverseOrder={false} />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">{t('serviceImage')}</label>
                    <input type="file" className="form-control" onChange={handleImageChange} />
                    {errors.image && <div className="text-danger">{errors.image}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('serviceName')} (EN)</label>
                    <input type="text" name="titleEN" className="form-control" onChange={handleInputChange} />
                    {errors.titleEN && <div className="text-danger">{errors.titleEN}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('serviceName')} (AR)</label>
                    <input type="text" name="titleAR" className="form-control" onChange={handleInputChange} />
                    {errors.titleAR && <div className="text-danger">{errors.titleAR}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('serviceDescription')} (EN)</label>
                    <textarea name="descriptionEN" className="form-control" onChange={handleInputChange}></textarea>
                    {errors.descriptionEN && <div className="text-danger">{errors.descriptionEN}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('serviceDescription')} (AR)</label>
                    <textarea name="descriptionAR" className="form-control" onChange={handleInputChange}></textarea>
                    {errors.descriptionAR && <div className="text-danger">{errors.descriptionAR}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('servicePrice')}</label>
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
                    <label className="form-label">{t('userStatus')}</label>
                    <select
                        name="status"
                        className="form-select"
                        onChange={handleInputChange}
                        value={serviceData.status}
                    >
                        <option value={true}>{t('active')}</option>
                        <option value={false}>{t('inactive')}</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">{t('addService')}</button>
            </form>
        </div>
    );
}

export default AddService;
