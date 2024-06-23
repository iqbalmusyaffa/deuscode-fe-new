import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
});

axiosInstance.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken'); // Retrieve accessToken from localStorage
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    console.warn('Access token not found in localStorage');
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
