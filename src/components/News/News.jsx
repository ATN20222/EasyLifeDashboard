import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NewsService } from '../../Services/Api'; // Assuming NewsService has methods for fetching and deleting news
import toast, { Toaster } from 'react-hot-toast';

function News() {
    const { t } = useTranslation();
    const [newsItems, setNewsItems] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedNews, setSelectedNews] = useState({});

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const response = await NewsService.List();
            setNewsItems(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function confirmDelete(id) {
        try {
            const response = await NewsService.Delete(id); 
            getData();
            toast.success(response.message);
        } catch (error) {
            toast.error(error.data.message);
        }
        setShowConfirm(false);
        setSelectedNews({});
    }

    return (
        <div className="container-fluid p-4">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="d-flex justify-content-between align-items-center">
                <h1 className='m-0'>{t('news')}</h1>
                <NavLink to='/news/add' className='btn btn-dark'>{t('addNews')}</NavLink>
            </div>
            <div className="table-responsive">
                <table className="table table-hover mt-4">
                    <thead>
                        <tr>
                            <th>{t('newsTitle')}</th>
                            <th>{t('newsContent')}</th>
                            <th>{t('edit')}</th>
                            <th>{t('delete')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newsItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.titleEn}</td>
                                <td>{item.descriptionEn}</td>
                                <td>
                                    <Link to={`/news/edit/${item.id}`} className="btn btn-warning">
                                        <i className="fas fa-pen"></i>
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => {
                                        setSelectedNews(item);
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
                                <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>{t('confirmDelete')} {selectedNews?.titleEn}?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirm(false)}>
                                    {t('cancel')}
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => confirmDelete(selectedNews.id)}>
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

export default News;
