import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpClient } from '../api/HttpClient';
import '../style/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await httpClient.post('/login', {
        email: email.trim(),
        password: password,
      });

      console.log('Respuesta del login:', response.data);

      localStorage.setItem('token', response.data.access_token);
      navigate('/');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);

      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        const message = errors
          ? Object.values(errors).flat().join(' ')
          : 'Datos inválidos.';
        setError(message);
      } else {
        setError('Credenciales incorrectas o error en el servidor.');
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img
          src="https://thumbs.dreamstime.com/b/print-204010511.jpg"
          alt="Instagram Logo"
          style={{ width: '180px', marginBottom: '20px' }}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
          alt="Instagram Logo"
          className="logo"
        />

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Iniciar sesión</button>
        </form>

        <div className="login-footer">
          <p>¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
