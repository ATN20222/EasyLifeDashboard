import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NewsService } from '../../Services/Api'; // Assuming NewsService has methods to fetch and update news
import toast, { Toaster } from 'react-hot-toast';

function EditNews() {
    const { t } = useTranslation();
    const [newsData, setNewsData] = useState({
        image: null,
        titleEN: '',
        titleAR: '',
        descriptionEN: '',
        descriptionAR: '',
    });
    const [errors, setErrors] = useState({});
    const [file, setFile] = useState(null); // File state for new uploaded image
    const { id } = useParams();

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const response = await NewsService.GetById(id); // Fetch the news data
            setNewsData({
                titleEN: response.data[0].titleEn,
                titleAR: response.data[0].titleAr,
                descriptionEN: response.data[0].descriptionEn,
                descriptionAR: response.data[0].descriptionAr,
                imageUrl: response.data[0].imageUrl, 
            });
        } catch (error) {
            console.error(error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewsData({ ...newsData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFile(e.target.files[0]); // Store the uploaded file in the file state
    };

    const validate = () => {
        const newErrors = {};
        if (!newsData.titleEN) newErrors.titleEN = t('newsTitle') + ' (EN) ' + t('isRequired');
        if (!newsData.titleAR) newErrors.titleAR = t('newsTitle') + ' (AR) ' + t('isRequired');
        if (!newsData.descriptionEN) newErrors.descriptionEN = t('newsContent') + ' (EN) ' + t('isRequired');
        if (!newsData.descriptionAR) newErrors.descriptionAR = t('newsContent') + ' (AR) ' + t('isRequired');
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await NewsService.PutNews(id, newsData,file);
                console.log('News Updated:', response);
                toast.success(response.message);
                getData();
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        }
    };

    return (
        <div className="container-fluid p-4">
            <Toaster position="top-right" reverseOrder={false} />
            <h1>{t('editNews')}</h1>
            <form onSubmit={handleSubmit}>
                {newsData.imageUrl && (
                    <div className="mb-3">
                        <label className="form-label">{t('currentImage')}</label>
                        <div>
                            <img src={newsData.imageUrl} alt="Current News" className="img-fluid" style={{ maxWidth: '200px' }} />
                        </div>
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label">{t('newsImage')}</label>
                    <input type="file" className="form-control" onChange={handleImageChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('newsTitle')} (EN)</label>
                    <input type="text" name="titleEN" className="form-control" onChange={handleInputChange} value={newsData.titleEN} />
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('newsTitle')} (AR)</label>
                    <input type="text" name="titleAR" className="form-control" onChange={handleInputChange} value={newsData.titleAR} />
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('newsContent')} (EN)</label>
                    <textarea name="descriptionEN" className="form-control" onChange={handleInputChange} value={newsData.descriptionEN}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('newsContent')} (AR)</label>
                    <textarea name="descriptionAR" className="form-control" onChange={handleInputChange} value={newsData.descriptionAR}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">{t('save')}</button>
            </form>
        </div>
    );
}

export default EditNews;
