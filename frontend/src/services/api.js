import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cuvette-omega-silk.vercel.app', 
  withCredentials: true, 
});

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
