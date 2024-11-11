import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check for empty fields
        if (!credentials.email || !credentials.password) {
            setError('Both email and password are required');
            return;
        }

        // Simulate login logic
        if (credentials.email === 'antonabdalla30@gmail.com' && credentials.password === 'password') {
            console.log('Logged in successfully');
            setError(null);  // Clear any previous error
            onLogin();       // Trigger the login function to set authentication
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">Login to Dashboard</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="input-group">
                    <label htmlFor="username">Email</label>
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
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        // required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
