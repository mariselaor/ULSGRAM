import React, { useState } from 'react';
import axios from 'axios';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleLogin = async () => {
    try {
      setError(null);
      setMessage(null);

      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password
      });

      setMessage(response.data.message || 'Login exitoso');
      // Aquí podrías guardar el token, redirigir, etc.
    } catch (err) {
      console.error('Error de login:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: 'auto' }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <button onClick={handleLogin} style={{ width: '100%' }}>
        Iniciar sesión
      </button>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default LoginScreen;
