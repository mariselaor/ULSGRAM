import { useEffect, useState } from "react";
import { httpClient } from "../api/HttpClient";
import '../style/perfil.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    httpClient.get("/user-profile")
      .then(res => setUser(res.data.user))
      .catch(err => console.error("Error al obtener perfil", err));

    httpClient.get("/publicaciones")
      .then(res => setPosts(res.data))
      .catch(err => console.error("Error al obtener publicaciones", err));
  }, []);

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-500 text-lg">Cargando perfil...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      {/* Perfil principal */}
      <div className="profile-container">
        {/* Foto perfil */}
        <div className="profile-avatar">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.name} avatar`}
            />
          ) : (
            <span>{user.name[0].toUpperCase()}</span>
          )}
          <input
            type="file"
            accept="image/*"
            title="Cambiar foto"
            onChange={() => alert("Funcionalidad para subir foto pendiente")}
          />
        </div>

        {/* Datos principales */}
        <div className="profile-info">
          <div className="profile-name">
            {user.name}
            <span className="profile-username">@{user.username || user.name.toLowerCase().replace(/\s+/g, '')}</span>
          </div>

          <div className="profile-followers">
            <div>
              <span className="number">{user.followers || 0}</span>
              Seguidores
            </div>
            <div>
              <span className="number">{user.following || 0}</span>
              Siguiendo
            </div>
          </div>

          {/* Botón de editar perfil */}
          <button
            className="edit-profile-button"
            onClick={() => alert('Funcionalidad para editar perfil pendiente')}
          >
            Editar perfil
          </button>
        </div>
      </div>

      {/* Publicaciones */}
      <section className="posts-section">
        <h2>Mis publicaciones</h2>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No hay publicaciones todavía.</p>
        ) : (
          <div className="posts-grid">
            {posts.map(post => (
              <article key={post.id} className="post-card">
                <img
                  src={post.url}
                  alt={post.titulo}
                />
                <div className="post-content">
                  <h3 className="post-title">{post.titulo}</h3>
                  <p className="post-description">{post.descripcion}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
