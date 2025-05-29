import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
      localStorage.setItem('token', token);
      setSuccess('Registro exitoso');
      navigate('/profile');
    } catch (err) {
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        if (errors.email?.includes('The email has already been taken.')) {
          setError('Este correo ya está registrado. Intenta iniciar sesión o usa otro correo.');
        } else {
          setError('Error de validación en el formulario.');
        }
      } else {
        setError(err.response?.data?.message || 'Error al registrar');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '450px', width: '100%' }}>
        <h3 className="text-center mb-4 text-primary">Crear Cuenta</h3>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Nombre de Usuario"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="usuario@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Confirmar contraseña</label>
            <input
              type="password"
              name="password_confirmation"
              className="form-control"
              placeholder="Vuelve a escribir la contraseña"
              value={form.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Registrarse
          </button>
          <div className="login-footer">
          <p>¿Ya tienes una cuenta? <a href="/login">Login</a></p>
        </div>
        </form>
      </div>
    </div>
  );
}
