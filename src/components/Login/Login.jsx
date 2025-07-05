import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Login.css';
import { AuthService } from '../../Services/Api';
import toast from 'react-hot-toast';

function Login({ onLogin }) {
    const { t } = useTranslation();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hello")
        setError(null);  
        // Check for empty fields
        if (!credentials.email || !credentials.password) {
            setError(t('loginError'));
            return;
        }
        try {
            const response  = await AuthService.Login(credentials.email , credentials.password)
            onLogin();     
        } catch (error) {
            setError(t('loginError'))
        }

        
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">{t('login')}</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="input-group">
                    <label htmlFor="username">{t('email')}</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        // required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">{t('password')}</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        // required
                    />
                </div>
                <button type="submit" className="login-button">{t('loginButton')}</button>
            </form>
        </div>
    );
}

export default Login;
