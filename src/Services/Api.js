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
            formData.append("file", file);
            formData.append("ImageUrl", serviceData.imageUrl);
            
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

const NewsService = {
    List: async () => {
        try {
            const response = await axiosInstance.get(`/news`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
    GetById: async (id) => {
        try {
            const response = await axiosInstance.get(`/news/${id}`);
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error(error.response.data.message);
        }
    },
    Add: async (newsData) => {
        try {
            const formData = new FormData();
            formData.append("id",0);
            formData.append("TitleEn", newsData.titleEN);
            formData.append("TitleAr", newsData.titleAR);
            formData.append("DescriptionEn", newsData.descriptionEN);
            formData.append("DescriptionAr", newsData.descriptionAR);
            formData.append("file", newsData.image);
            formData.append("ImageUrl", newsData.imageUrl);
            const response = await axiosInstance.post(`/news`, formData,{
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
    PutNews: async (id, newsData, file) => {
        try {
            const formData = new FormData();
            formData.append("id",id);
            formData.append("TitleEn", newsData.titleEN);
            formData.append("TitleAr", newsData.titleAR);
            formData.append("DescriptionEn", newsData.descriptionEN);
            formData.append("DescriptionAr", newsData.descriptionAR);
            formData.append("file", file);
            formData.append("ImageUrl", newsData.imageUrl);
            
            const response = await axiosInstance.put(`/news/${id}`, formData, {
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
            const response = await axiosInstance.delete(`/news/${id}`);
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error(error.response.data.message);
        }
    },
}

const NotificationsService = {
    List: async () => {
        try {
            const response = await axiosInstance.get(`/notifications`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
    Add: async (data, date) => {
        try {
            const formData = new FormData();
            formData.append("id",0);
            formData.append("title", data.title);
            formData.append("description", data.description);
            
            formData.append("date", date);
            const response = await axiosInstance.post(`/notifications`, formData);
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error(error.response.data);
        }
    },

    Delete: async (id) => {
        try {
            const response = await axiosInstance.delete(`/notifications/${id}`);
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error(error.response.data.message);
        }
    },
}

const ReservationsService = {
    List: async () => {
        try {
            const response = await axiosInstance.get(`/reservations`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
    GetById: async (id) => {
        try {
            const response = await axiosInstance.get(`/reservations/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
    Edit: async (data) => {
        try {
            const formData = new FormData();
            formData.append("id",0);
            formData.append("title", data.title);
            formData.append("description", data.description);
            const response = await axiosInstance.post(`/reservations`, formData);
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error(error.response.data);
        }
    },
    updateReservation: async (id,data) => {
        try {
            const formData = new FormData();
            // formData.append("id",id);
            formData.append("ReservationStatusId", data.reservationStatus);
            formData.append("ReservationTime", data.reservationTime);
            const response = await axiosInstance.post(`/reservations/${id}`, formData);
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error(error.response.data);
        }
    },

}

const UsersService = {
    List: async () => {
        try {
            const response = await axiosInstance.get(`/Users/Retrieve`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
    
    Ban: async (id) => {
        try {
            const response = await axiosInstance.post(`/Users/Ban/${id}`);
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error(error.response.data);
        }
    },
    UnBan: async (id) => {
        try {
            const response = await axiosInstance.post(`/Users/Unban/${id}`);
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error(error.response.data);
        }
    },

}



export {
    AuthService,
    ServicesService,
    NewsService,
    NotificationsService,
    ReservationsService,
    UsersService
}
