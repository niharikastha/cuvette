import axios from 'axios';
const axiosInstance = axios.create({
  // baseURL: 'https://cuvette-omega-silk.vercel.app', 
  baseURL: 'http://localhost:5000', 
  withCredentials: true, 
});

export default axiosInstance;
