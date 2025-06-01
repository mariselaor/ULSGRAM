import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Home() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/publicaciones')
      .then(response => {
        setPublicaciones(response.data);
      })
      .catch(error => {
        console.error('Error al cargar publicaciones:', error);
      });
  }, []);

  return (
    <div className="container my-4">
      <Navbar />
      <div className="text-center mb-4">
        <h1>Bienvenido a la Página de Inicio</h1>
        <p className="lead">Has iniciado sesión correctamente.</p>
      </div>

      <div>
        <h2 className="mb-3">Publicaciones</h2>
        {publicaciones.length === 0 ? (
          <p>No hay publicaciones aún.</p>
        ) : (
          <div className="row">
            {publicaciones.map((publicacion) => (
              <div key={publicacion.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{publicacion.titulo}</h5>
                    <p className="card-text flex-grow-1">{publicacion.contenido}</p>
                    <p className="text-muted mb-0"><small>Autor: {publicacion.user?.name || 'Desconocido'}</small></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
