import React, { useState } from 'react';
import { NewsService } from '../../Services/Api'; // Assuming NewsService has methods to add news
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddNews() {
    const [newsData, setNewsData] = useState({
        image: null,
        titleEN: '',
        titleAR: '',
        descriptionEN: '',
        descriptionAR: '',
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewsData({ ...newsData, [name]: value });
    };

    const handleImageChange = (e) => {
        setNewsData({ ...newsData, image: e.target.files[0] });
    };

    const validate = () => {
        const newErrors = {};
        if (!newsData.image) newErrors.image = 'Image is required';
        if (!newsData.titleEN) newErrors.titleEN = 'Title (EN) is required';
        if (!newsData.titleAR) newErrors.titleAR = 'Title (AR) is required';
        if (!newsData.descriptionEN) newErrors.descriptionEN = 'Description (EN) is required';
        if (!newsData.descriptionAR) newErrors.descriptionAR = 'Description (AR) is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await NewsService.Add(newsData); 
                console.log('News Added:', response);
                toast.success(response.message);
                setTimeout(() => {
                    navigate('/news')
                }, 2000);
            } catch (error) {
                console.error('Error adding news:', error);
                toast.error('Error adding news');
            }
        }
    };

    return (
        <div className="container-fluid p-4">
            <Toaster position="top-right" reverseOrder={false} />
            <h1>Add News</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">News Image</label>
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
                <button type="submit" className="btn btn-primary">Add News</button>
            </form>
        </div>
    );
}

export default AddNews;
