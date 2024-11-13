// ---------- Import ---------- //
import axios from "axios";
import Cookies from "universal-cookie";

// ---------- Const Variables ---------- //
const baseURL = 'https://localhost:7201/api';
const cookie = new Cookies();

// ---------- Functions ---------- //
// Set Token
export const setToken = (token) => {
    cookie.set('token', token, { path: '/' });
};
// Get Token
export const getToken = () => {
    return cookie.get('token');
};
// Delete Token
export const deleteToken = () => {
    cookie.remove('token', { path: '/' });
    localStorage.clear();
    sessionStorage.clear();
};

// Instance From Axios
const axiosInstance = axios.create({
    baseURL: baseURL,
    Accept:'application/json',
    "Accept-Language":'all',
});
axiosInstance.putForm = (url, formData) => {
    return axiosInstance.put(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

// Axios Interceptors Request
axiosInstance.interceptors.request.use(
    async config => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.Accept = 'application/json';
            config.headers["Accept-Language"] = 'all';
            // config.headers["Content-Type"] = 'multipart/form-data'
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Axios Interceptors Response
axiosInstance.interceptors.response.use(
    response => response,
    async error => {      
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry && getToken()) {
            originalRequest._retry = true;
            try {
                // Send the current token in the Authorization header for the refresh request
                const response = await axiosInstance.post('auth/refresh');
                // console.log(response);
                console.log(getToken());
                setToken(response.data.token);
                // console.log(setToken(response.data.token));
                
                originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
                // Update the authorization header and retry the original request
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                console.log(getToken());
                // console.log(refreshError);
            }
        }else if(error.response.status === 460){
            deleteToken();
            localStorage.clear();
            window.location.href = '/login'
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;