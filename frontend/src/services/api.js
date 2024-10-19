import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cuvette-omega-silk.vercel.app/?vercelToolbarCode=qjaMRZnONDF9ODI', 
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


export default axiosInstance;
