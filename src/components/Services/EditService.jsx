import React, { useEffect, useState } from 'react';
import './Services.css';
import { ServicesService } from '../../Services/Api';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function EditService() {
    const [serviceData, setServiceData] = useState({
        titleEN: '',
        titleAR: '',
        descriptionEN: '',
        descriptionAR: '',
        status: 0,
        price: '',  
        imageUrl: 'image', 
    });
    const [file, setFile] = useState(null); // File state for new uploaded image
    const { id } = useParams();

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const response = await ServicesService.GetById(id);
            setServiceData({
                titleEN: response.data[0].nameEn,
                titleAR: response.data[0].nameAr,
                descriptionEN: response.data[0].descriptionEn,
                descriptionAR: response.data[0].descriptionAr,
                status: response.data[0].status,
                price: response.data[0].price,
                imageUrl: response.data[0].imageUrl, 
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setServiceData({ ...serviceData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFile(e.target.files[0]); // Store the uploaded file in the file state
    };

    const validate = () => {
        const newErrors = {};
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
                // Call the Edit function from ServicesService
                const response = await ServicesService.PutService(id, serviceData, file); // Pass file along with service data
                console.log('Service Updated:', response);
                getData();
                toast.success(response.message)
                
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        }
    };

    return (
        <div className="container-fluid p-4">
            <div className="Toast">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <h1>Edit Service</h1>
            <form onSubmit={handleSubmit}>
                {/* Display the current image */}
                {serviceData.imageUrl && (
                    <div className="mb-3">
                        <label className="form-label">Current Image</label>
                        <div>
                            <img
                                src={serviceData.imageUrl}
                                alt="Current Service"
                                className="img-fluid"
                                style={{ maxWidth: '200px' }}
                            />
                        </div>
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label">Service Image</label>
                    <input type="file" className="form-control" onChange={handleImageChange} />
                    {errors.image && <div className="text-danger">{errors.image}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Title (EN)</label>
                    <input
                        type="text"
                        name="titleEN"
                        className="form-control"
                        onChange={handleInputChange}
                        value={serviceData.titleEN}
                    />
                    {errors.titleEN && <div className="text-danger">{errors.titleEN}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Title (AR)</label>
                    <input
                        type="text"
                        name="titleAR"
                        className="form-control"
                        onChange={handleInputChange}
                        value={serviceData.titleAR}
                    />
                    {errors.titleAR && <div className="text-danger">{errors.titleAR}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Description (EN)</label>
                    <textarea
                        name="descriptionEN"
                        className="form-control"
                        onChange={handleInputChange}
                        value={serviceData.descriptionEN}
                    />
                    {errors.descriptionEN && <div className="text-danger">{errors.descriptionEN}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Description (AR)</label>
                    <textarea
                        name="descriptionAR"
                        className="form-control"
                        onChange={handleInputChange}
                        value={serviceData.descriptionAR}
                    />
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
                <button type="submit" className="btn btn-primary">
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditService;
