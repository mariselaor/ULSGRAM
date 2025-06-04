import api from './api';

const login = async (email, password) => {
  try {
    const response = await api.post('/login', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response.data);
    throw error;
  }
};