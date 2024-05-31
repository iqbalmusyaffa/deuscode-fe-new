import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // API URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
