import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // <-- Importa useNavigate

export default function Registro() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();  // <-- Hook para redirigir

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('http://localhost:8000/api/register', form);

      const token = response.data.access_token;
      // Guardar token en localStorage
      localStorage.setItem('token', token);

      setSuccess('Registro exitoso');
      // Redirigir a perfil
      navigate('/profile');  // <-- Cambia la ruta si usas otra

    } catch (err) {
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        if (errors) {
          const messages = Object.values(errors).flat().join(' ');
          setError(messages);
        } else {
          setError('Error de validación en el formulario.');
        }
      } else {
        setError(err.response?.data?.message || 'Error al registrar');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Registro</h2>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="password"
        name="password_confirmation"
        placeholder="Confirmar contraseña"
        value={form.password_confirmation}
        onChange={handleChange}
        required
      />
      <br />
      <button type="submit">Registrarse</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
}
