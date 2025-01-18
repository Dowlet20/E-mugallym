import axios from 'axios';

export const base_URL = 'http://216.250.12.100:5000/';



const axiosInstance = axios.create({
  baseURL: base_URL,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;