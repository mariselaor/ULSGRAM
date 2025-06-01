import React, { useEffect, useState } from 'react';
import { httpClient } from '../api/HttpClient';
import Comentarios from './comentarios';

function Publicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [comentariosVisibles, setComentariosVisibles] = useState({});
  const [error, setError] = useState(null);
  const [loadingLikes, setLoadingLikes] = useState({}); // Estado para botones de like

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

  const toggleLike = async (publicacionId) => {
    setLoadingLikes(prev => ({ ...prev, [publicacionId]: true }));
    
    try {
      const response = await httpClient.post(`/publicaciones/${publicacionId}/like`);
      
      // Actualizar el estado local
      setPublicaciones(prev => prev.map(pub => {
        if (pub.id === publicacionId) {
          return {
            ...pub,
            likes_count: response.data.likes_count,
            // Si necesitas manejar el estado de like del usuario actual:
            is_liked: response.data.action === 'added'
          };
        }
        return pub;
      }));
      
    } catch (err) {
      console.error("Error al dar like:", err);
      alert(err.response?.data?.message || "Error al dar like");
    } finally {
      setLoadingLikes(prev => ({ ...prev, [publicacionId]: false }));
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
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
            <button 
              onClick={() => toggleLike(pub.id)}
              disabled={loadingLikes[pub.id]}
              style={{
                marginRight: 10,
                background: pub.is_liked ? '#0095f6' : '#f0f0f0',
                color: pub.is_liked ? 'white' : 'black',
                border: 'none',
                padding: '5px 10px',
                borderRadius: 5,
                cursor: 'pointer'
              }}
            >
              {loadingLikes[pub.id] ? '...' : '👍 Like'} ({pub.likes_count || 0})
            </button>
          </div>

          {comentariosVisibles[pub.id] && <Comentarios postId={pub.id} />}
        </div>
      ))}
    </div>
  );
}

export default Publicaciones;