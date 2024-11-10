import React from 'react';
import { Link, NavLink } from 'react-router-dom';


function News() {
    const newsItems = [
        { id: 1, title: 'News 1', description: 'Description 1' },
        { id: 2, title: 'News 2', description: 'Description 2' },
        // Additional news items as needed
    ];

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className='m-0'>News</h1>
                <NavLink to='/news/add' className='btn btn-dark'>Add New</NavLink>
            </div>
            <div className="table-responsive">
                <table className="table table-hover mt-4">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newsItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>
                                    <Link to={`/news/edit/${item.id}`} className="btn btn-warning">
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

export default News;
