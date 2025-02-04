import axios from 'axios';

export const base_URL = 'http://216.250.14.38:5000/api/';

//export const base_URL = 'http://216.250.13.53/api/course/';



const axiosInstance = axios.create({
  baseURL: base_URL,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;