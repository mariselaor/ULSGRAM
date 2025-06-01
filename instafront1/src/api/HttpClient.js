import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Agrega interceptor para enviar token en cada petición
httpClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});