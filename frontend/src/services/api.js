import axios from 'axios';
const axiosInstance = axios.create({
  // baseURL: 'https://trello-backend-vert.vercel.app/api', 
  baseURL: 'http://localhost:5000', 
  withCredentials: true, 
});

export default axiosInstance;
