import axios from 'axios';
import axiosInstance, { deleteToken, setToken } from './axiosInstance';

const baseURL = 'https://localhost:7201/api';
const axiosApi = axios.create({
    baseURL: baseURL,
    Accept: 'application/json',
    "Content-Type": 'application/json'
});
const AuthService = {
    Login: async (email, password) => {
        try {
            const data = {
                email: email,
                password: password
            }
            const response = await axiosApi.post(`/auth/login`, data);
            setToken(response.data.token);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data);
        }
    },
    Register: async (username, email, password) => {
        try {
            const data = {
                username: username,
                email: email,
                password: password
            }
            const response = await axiosApi.post(`/auth/register`, data);
            return response.data;
        } catch (error) {
            // console.log('f',error.response.data[0].description)
            throw new Error(error.response.data[0].description);

        }
    },
    Logout: async () => {
        try {
            const response = await axiosInstance.post(`/auth/logout`);
            deleteToken();
            localStorage.clear();
            return response.data;
        } catch (error) {
            throw new Error(error.response.data);
        }
    },


}

const ServicesService = {
    List: async () => {
        try {
            const response = await axiosInstance.get(`/services`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
    GetById: async (id) => {
        try {

            const response = await axiosInstance.get(`/services/${id}`);
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error(error.response.data.message);
        }
    },
    Add: async ( serviceData) => {
        try {
            const formData = new FormData();
            formData.append("id",0);
            formData.append("NameEn", serviceData.titleEN);
            formData.append("NameAr", serviceData.titleAR);
            formData.append("DescriptionEn", serviceData.descriptionEN);
            formData.append("DescriptionAr", serviceData.descriptionAR);
            formData.append("Price", serviceData.price);
            formData.append("Status", serviceData.status);
            formData.append("file", serviceData.image);
            formData.append("ImageUrl", serviceData.imageUrl);

            const response = await axiosInstance.post(`/services`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error(error.response.data);
        }
    },
    PutService: async (id, serviceData, file) => {
        try {
            const formData = new FormData();
            formData.append("id",id);
            formData.append("NameEn", serviceData.titleEN);
            formData.append("NameAr", serviceData.titleAR);
            formData.append("DescriptionEn", serviceData.descriptionEN);
            formData.append("DescriptionAr", serviceData.descriptionAR);
            formData.append("Price", serviceData.price);
            formData.append("Status", serviceData.status);

            // If updating the image, append it to the form data
            formData.append("file", file);
            formData.append("ImageUrl", serviceData.imageUrl);
            if (file) {
            } else {
                // Keep the existing image URL if no new file is provided
            }

            const response = await axiosInstance.put(`/services/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || "An error occurred");
        }
    },
    Delete: async (id) => {
        try {
            const response = await axiosInstance.delete(`/services/${id}`);
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error(error.response.data.message);
        }
    },
}

export {
    AuthService,
    ServicesService
}
