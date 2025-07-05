import React from 'react';
import { useTranslation } from 'react-i18next';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Home() {
    const { t } = useTranslation();
    
    const statistics = {
        users: 120,
        services: 45,
        notifications: 230,
        reservations: 500,
    };

    const userChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Users',
                data: [10, 20, 30, 50, 80, 120],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)'
            }
        ]
    };

    const serviceChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Services',
                data: [5, 10, 15, 25, 35, 45],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)'
            }
        ]
    };

    const notificationChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Notifications Sent',
                data: [20, 40, 60, 80, 150, 230],
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)'
            }
        ]
    };
    const reservationsChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Reservations recieved',
                data: [20, 40, 60, 80, 150, 230],
                borderColor: 'rgba(220, 53, 69 , 0.85)',
                backgroundColor: 'rgba(220 ,53 ,69 ,0.2)'
            }
        ]
    };

    

    return (
        <div className="container-fluid p-4">
            <h1 className="mb-4">{t('dashboard')}</h1>
            <div className="row">
                <div className="col-md-3">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{t('users')}</h5>
                            <p className="card-text display-4">{statistics.users}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{t('services')}</h5>
                            <p className="card-text display-4">{statistics.services}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-warning mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{t('notifications')}</h5>
                            <p className="card-text display-4">{statistics.notifications}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-danger mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{t('reservations')}</h5>
                            <p className="card-text display-4">{statistics.reservations}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6 mt-5">
                    <h4>{t('users')} Over Time</h4>
                    <Line data={userChartData} />
                </div>
                <div className="col-md-6 mt-5">
                    <h4>{t('services')} Over Time</h4>
                    <Line data={serviceChartData} />
                </div>
                <div className="col-md-6 mt-5">
                    <h4>{t('notifications')} Sent Over Time</h4>
                    <Line data={notificationChartData} />
                </div>
                <div className="col-md-6 mt-5">
                    <h4>{t('reservations')} Received Over Time</h4>
                    <Line data={reservationsChartData} />
                </div>
            </div>
        </div>
    );
}

export default Home;
