import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Interceptor para añadir token
httpClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
httpClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Puedes personalizar el manejo de errores aquí
      console.error('Error response:', error.response);
    }
    return Promise.reject(error);
  }
);