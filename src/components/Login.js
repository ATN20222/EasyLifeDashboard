import React from 'react';

function Login() {
    return (
        <div className="container-fluid p-4">
            <h1>Login Page</h1>
            <form>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;
