import React, { useEffect, useState } from 'react';
import { httpClient } from '../api/HttpClient';
import Comentarios from './comentarios';  // Asegúrate que la ruta sea correcta

function Publicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [comentariosVisibles, setComentariosVisibles] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarPublicaciones();
  }, []);

  const cargarPublicaciones = async () => {
    try {
      const res = await httpClient.get("/publicaciones");
      setPublicaciones(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al cargar publicaciones");
    }
  };

  const darLike = async (id) => {
    try {
      await httpClient.post(`/publicaciones/${id}/like`);
      cargarPublicaciones();
    } catch (err) {
      alert(err.response?.data?.message || "Error al dar like");
    }
  };

  const toggleComentarios = (id) => {
    setComentariosVisibles(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Publicaciones</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {publicaciones.length === 0 && <p>No hay publicaciones disponibles.</p>}
      {publicaciones.map(pub => (
        <div key={pub.id} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
          <h3>{pub.titulo}</h3>
          <p>{pub.descripcion}</p>
          {pub.url && (
            <img
              src={pub.url}
              alt={pub.titulo}
              style={{ maxWidth: '100%', cursor: 'pointer' }}
              onClick={() => toggleComentarios(pub.id)}
            />
          )}
          <p>Likes: {pub.likes?.length || 0}</p>
          <button onClick={() => darLike(pub.id)}>Like</button>

          {comentariosVisibles[pub.id] && <Comentarios postId={pub.id} />}
        </div>
      ))}
    </div>
  );
}

export default Publicaciones;
