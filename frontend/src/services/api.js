import axios from 'axios';
import Router from 'next/router'; 

const axiosInstance = axios.create({
  baseURL: 'https://cuvette-omega-silk.vercel.app', 
  withCredentials: true, 
});

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) { 
      Router.push('/login');  
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
