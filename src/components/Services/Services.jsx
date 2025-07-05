import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ServicesService } from '../../Services/Api';
import toast, { Toaster } from 'react-hot-toast';

function Services() {
    const { t } = useTranslation();
    // const services = [
    //     { id: 1, title: 'Service 1', price: '$100' ,status:0 },
    //     { id: 2, title: 'Service 2', price: '$200' ,status:1 },
    //     // Additional services as needed
    // ];
    const [services , setServices] = useState([]);
    const [showConfirm , setShowConfirm] = useState(false);
    const [selectedService , setSelectedService] = useState({});
    useEffect(()=>{
        getData();
    },[])
    

    async function getData() {
        try {
            const response = await ServicesService.List();
            setServices(response.data);
        } catch (error) {
            console.error(error);
            
        }
    }
    async function confirmDelete(id) {
        try {
            const response = await ServicesService.Delete(id); 
                console.log('Service Updated:', response);
                getData();
                toast.success(response.message);
        } catch (error) {
            toast.error(error.data.message)
        }
        setShowConfirm(false);
        setSelectedService({});
    }

    return (
        <div className="container-fluid p-4">
            <div className="Toast">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <h1 className='m-0'>{t('services')}</h1>
                <NavLink to='/services/add' className='btn btn-dark Center'>{t('addService')}</NavLink>
            </div>
            <div className="table-responsive">
                <table className="table table-hover mt-4">
                    <thead>
                        <tr>
                            <th>{t('serviceName')}</th>
                            <th>{t('servicePrice')}</th>
                            <th>{t('userStatus')}</th>
                            <th>{t('edit')}</th>
                            <th>{t('delete')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service.id}>
                                <td>{service.nameEn}</td>
                                <td>{service.price}</td>
                                <td>{service.status ? t('active') : t('inactive')}</td>
                                <td>
                                    <Link to={`/services/edit/${service.id}`} className="btn btn-warning">
                                        <i className="fas fa-pen"></i>
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={()=>{
                                        setSelectedService(service);
                                        setShowConfirm(true);
                                    }}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>


            {showConfirm && (
                <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{t('confirmDelete')}</h5>
                                <button type="button" className="btn-close" onClick={()=>setShowConfirm(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>{t('confirmDelete')} {selectedService?.nameEn}?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={()=>setShowConfirm(false)}>
                                    {t('cancel')}
                                </button>
                                <button type="button" className="btn btn-danger" onClick={()=>confirmDelete(selectedService.id)}>
                                    {t('yes')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}

export default Services;
