import { useEffect, useState } from "react";
import { httpClient } from "../api/HttpClient";
import '../style/perfil.css'; // Asegúrate de que este archivo CSS existe y está bien definido
import 'bootstrap/dist/css/bootstrap.min.css'; // Usaremos algunas clases de Bootstrap para el modal

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    // Al cargar el componente, intentamos obtener el perfil del usuario autenticado
    httpClient.get("/user-profile")
      .then(res => {
        setUser(res.data.user);
        // Inicializar los campos de edición con los datos actuales del usuario
        setEditName(res.data.user.name || '');
        setEditBio(res.data.user.bio || '');
      })
      .catch(err => console.error("Error al obtener perfil", err));

    // También obtenemos las publicaciones del usuario
    httpClient.get("/publicacion") // Asume que esta ruta devuelve las publicaciones del usuario actual
      .then(res => setPosts(res.data))
      .catch(err => console.error("Error al obtener publicaciones", err));
  }, []);

  // Función para abrir el modal de edición
  const openEditModal = () => {
    // Asegurarse de que los campos del modal tienen los datos actuales del usuario
    setEditName(user.name || '');
    setEditBio(user.bio || '');
    setShowEditModal(true);
  };

  // Función para cerrar el modal de edición
  const closeEditModal = () => {
    setShowEditModal(false);
    setIsUpdating(false); // Resetear estado de actualización
  };

  // Función para guardar los cambios del perfil (nombre y biografía)
  const handleSaveEdit = async () => {
    // Validaciones básicas antes de enviar los datos
    if (!editName.trim()) {
      alert("El nombre no puede estar vacío.");
      return;
    }
    if (editName.trim().length < 2) {
      alert("El nombre debe tener al menos 2 caracteres.");
      return;
    }
    if (editBio.length > 500) {
      alert("La biografía no puede exceder los 500 caracteres.");
      return;
    }

    setIsUpdating(true); // Indica que la actualización está en progreso
    try {
      // Envía una petición PATCH para actualizar el perfil del usuario
      // Asume que la API espera un objeto con 'name' y 'bio'
      const response = await httpClient.patch(`/usuarios/${user.id}`, {
        name: editName.trim(),
        bio: editBio.trim(),
      });

      // Actualiza el estado 'user' con los nuevos datos
      setUser(prevUser => ({
        ...prevUser,
        name: response.data.name,
        bio: response.data.bio,
      }));

      alert("✅ Perfil actualizado correctamente.");
      closeEditModal(); // Cierra el modal después de guardar
    } catch (error) {
      console.error("Error al actualizar perfil:", error.response?.data || error.message);
      let errorMessage = "Error al actualizar perfil.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      alert(`❌ ${errorMessage}`);
    } finally {
      setIsUpdating(false); // Finaliza la actualización
    }
  };

  // Función para manejar el cambio de la foto de perfil
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de archivo (solo imágenes)
    if (!file.type.startsWith('image/')) {
      alert("❌ Por favor, selecciona un archivo de imagen válido.");
      return;
    }
    // Validar tamaño de archivo (ej. máximo 5MB)
    if (file.size > 5 * 1024 * 1024) { // 5 MB
      alert("❌ El tamaño de la imagen no puede exceder los 5 MB.");
      return;
    }

    setUploadingAvatar(true); // Indica que la subida de avatar está en progreso
    const formData = new FormData();
    formData.append('avatar', file); // 'avatar' debe coincidir con el nombre esperado en tu backend

    try {
      // Envía una petición POST para subir el avatar
      // Asume que tu backend tiene una ruta para esto, por ejemplo /usuarios/{id}/avatar
      const response = await httpClient.post(`/usuarios/${user.id}/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Importante para subir archivos
        },
      });

      // Actualiza el estado 'user' con la nueva URL del avatar
      // Asume que la respuesta contiene la nueva URL del avatar en `response.data.avatarUrl`
      setUser(prevUser => ({
        ...prevUser,
        avatar: response.data.avatarUrl,
      }));
      alert("✅ Foto de perfil actualizada correctamente.");
    } catch (error) {
      console.error("Error al subir la foto de perfil:", error.response?.data || error.message);
      let errorMessage = "Error al subir la foto de perfil.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      alert(`❌ ${errorMessage}`);
    } finally {
      setUploadingAvatar(false); // Finaliza la subida
    }
  };


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
            <span>{user.name?.[0]?.toUpperCase()}</span>
          )}
          {/* Input para cambiar foto */}
          {/* Lo envolvemos en una etiqueta para estilizarlo como un botón */}
          <label htmlFor="avatar-upload" className="change-avatar-btn" title="Cambiar foto de perfil">
            {uploadingAvatar ? 'Subiendo...' : 'Cambiar'}
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden-input" // Estilo para ocultar el input real
              onChange={handleAvatarChange}
              disabled={uploadingAvatar}
            />
          </label>
        </div>

        {/* Datos principales */}
        <div className="profile-info">
          <div className="profile-name">
            {user.name}
            <span className="profile-username">@{user.username || user.email?.split('@')[0] || 'usuario'}</span>
          </div>
          <p className="profile-bio">{user.bio || 'Sin biografía.'}</p> {/* Mostrar biografía aquí */}

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
          
          {/* Botón para abrir el modal de edición */}
          <button className="edit-profile-btn" onClick={openEditModal}>
            Editar Perfil
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

      {/* --- Modal de Editar Perfil --- */}
      {showEditModal && (
        <div className="modal-backdrop"> {/* Fondo oscuro del modal */}
          <div className="modal-content"> {/* Contenedor del modal */}
            <div className="modal-header">
              <h5 className="modal-title">Editar Perfil</h5>
              <button type="button" className="close-button" onClick={closeEditModal} disabled={isUpdating}>
                &times; {/* Símbolo de 'x' para cerrar */}
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="editName">Nombre:</label>
                <input
                  id="editName"
                  type="text"
                  className="form-control"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  maxLength={50}
                  disabled={isUpdating}
                />
                <small className="text-muted">{editName.length}/50</small>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="editBio">Biografía:</label>
                <textarea
                  id="editBio"
                  className="form-control"
                  rows="3"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  maxLength={500}
                  disabled={isUpdating}
                ></textarea>
                <small className="text-muted">{editBio.length}/500</small>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeEditModal} disabled={isUpdating}>
                Cancelar
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSaveEdit} disabled={isUpdating || !editName.trim()}>
                {isUpdating ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Guardando...
                  </>
                ) : (
                  "Guardar Cambios"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}