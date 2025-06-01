import { useEffect, useState } from "react";
import { httpClient } from "../api/HttpClient";
import "bootstrap/dist/css/bootstrap.min.css";
import Comentarios from "./comentarios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Controlar comentarios visibles por postId
  const [visibleComments, setVisibleComments] = useState({});

  useEffect(() => {
    // Obtener perfil de usuario
    httpClient
      .get("/user-profile")
      .then((res) => {
        console.log("Perfil usuario:", res.data);
        setUser(res.data.user);
        setEditName(res.data.user.name || "");
        setEditBio(res.data.user.bio || "");
      })
      .catch((err) => console.error("Error al obtener perfil", err));

    // Obtener publicaciones
    httpClient
      .get("/publicaciones")
      .then((res) => {
        console.log("Publicaciones recibidas:", res.data);
        setPosts(res.data);
      })
      .catch((err) => console.error("Error al obtener publicaciones", err));
  }, []);

  const openEditModal = () => {
    if (!user) return;
    setEditName(user.name || "");
    setEditBio(user.bio || "");
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setIsUpdating(false);
  };

  const handleSaveEdit = async () => {
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

    setIsUpdating(true);
    try {
      const response = await httpClient.patch(`/usuarios/${user.id}`, {
        name: editName.trim(),
        bio: editBio.trim(),
      });

      setUser((prev) => ({
        ...prev,
        name: response.data.name,
        bio: response.data.bio,
      }));

      alert("✅ Perfil actualizado correctamente.");
      closeEditModal();
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("❌ Error al actualizar perfil.");
      setIsUpdating(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("❌ Por favor, selecciona un archivo de imagen válido.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("❌ El tamaño de la imagen no puede exceder los 5 MB.");
      return;
    }

    setUploadingAvatar(true);
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await httpClient.post(
        `/usuarios/${user.id}/avatar`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUser((prev) => ({
        ...prev,
        avatar: response.data.avatarUrl,
      }));

      alert("✅ Foto de perfil actualizada correctamente.");
    } catch (error) {
      console.error("Error al subir la foto de perfil:", error);
      alert("❌ Error al subir la foto de perfil.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Alternar comentarios visibles
  const toggleComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <p className="text-muted">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Perfil */}
      <div className="text-center mb-4">
        <div className="position-relative d-inline-block">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.name} avatar`}
              className="rounded-circle"
              width={120}
              height={120}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div
              className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
              style={{ width: 120, height: 120, fontSize: "3rem" }}
              aria-label="Avatar por defecto"
            >
              <strong>{user.name?.[0]?.toUpperCase()}</strong>
            </div>
          )}
          <label
            htmlFor="avatar-upload"
            className="btn btn-sm btn-outline-secondary position-absolute bottom-0 end-0"
            style={{ cursor: uploadingAvatar ? "not-allowed" : "pointer" }}
          >
            {uploadingAvatar ? "Subiendo..." : "Cambiar"}
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="d-none"
              onChange={handleAvatarChange}
              disabled={uploadingAvatar}
              aria-disabled={uploadingAvatar}
            />
          </label>
        </div>

        <h3 className="mt-3">{user.name}</h3>
        <p className="text-muted">@{user.username || user.email?.split("@")[0]}</p>
        <p>{user.bio || "Sin biografía."}</p>
        <div className="mb-3">
          <span className="me-3">{user.followers || 0} Seguidores</span>
          <span>{user.following || 0} Siguiendo</span>
        </div>
        <button
          className="btn btn-primary"
          onClick={openEditModal}
          aria-label="Editar perfil"
        >
          Editar Perfil
        </button>
      </div>

      {/* Publicaciones */}
      <h4>Mis publicaciones</h4>
      {posts.length === 0 ? (
        <p className="text-muted">No hay publicaciones todavía.</p>
      ) : (
        <div className="row">
          {posts.map(({ id, url, titulo, descripcion }) => (
            <div key={id} className="col-md-4 mb-4">
              <div className="card">
                {url && (
                  <img
                    src={url}
                    alt={titulo}
                    className="card-img-top"
                    role="button"
                    style={{ cursor: "pointer", objectFit: "cover", maxHeight: "200px" }}
                    onClick={() => toggleComments(id)}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{titulo}</h5>
                  <p className="card-text">{descripcion}</p>

                  {/* Mostrar comentarios solo si están visibles para este post */}
                  {visibleComments[id] && <Comentarios postId={id} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Editar Perfil */}
      {showEditModal && (
        <div className="modal-backdrop fade show">
          <div
            className="modal d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
            aria-labelledby="editProfileModalLabel"
            onClick={closeEditModal}
          >
            <div
              className="modal-dialog"
              role="document"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 id="editProfileModalLabel" className="modal-title">
                    Editar Perfil
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Cerrar modal"
                    onClick={closeEditModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="editName" className="form-label">
                      Nombre
                    </label>
                    <input
                      id="editName"
                      className="form-control"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      maxLength={50}
                      disabled={isUpdating}
                      autoFocus
                      aria-required="true"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editBio" className="form-label">
                      Biografía
                    </label>
                    <textarea
                      id="editBio"
                      className="form-control"
                      rows="3"
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      maxLength={500}
                      disabled={isUpdating}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={closeEditModal}
                    disabled={isUpdating}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSaveEdit}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Guardando..." : "Guardar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
