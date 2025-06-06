// ejemplo api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // URL base de tu API
  timeout: 10000,
});

export default api;
