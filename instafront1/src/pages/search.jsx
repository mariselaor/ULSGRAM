// SearchUsers.jsx
import React, { useState, useEffect, useRef } from "react";
import { httpClient } from "../api/HttpClient";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SearchUsers() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [myUser, setMyUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFullProfile, setShowFullProfile] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const debounceTimeout = useRef(null);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Carga perfil propio y selección inicial
    httpClient.get("/usuarios/me")
      .then((res) => {
        setMyUser(res.data);
        setSelectedUser(res.data);
        setShowFullProfile(true);
      })
      .catch((err) => {
        console.error("Error al cargar perfil:", err);
      });
    fetchRecentUsers();
  }, []);

  const fetchRecentUsers = () => {
    setLoading(true);
    httpClient.get("/usuarios/recent")
      .then((res) => {
        setResults(res.data);
        setLoading(false);
        setShowDropdown(true);
      })
      .catch(() => {
        setResults([]);
        setLoading(false);
        setShowDropdown(false);
      });
  };

  const fetchUsers = (searchTerm) => {
    if (!searchTerm.trim()) {
      fetchRecentUsers();
      return;
    }
    setLoading(true);
    httpClient.get(`/usuarios?search=${encodeURIComponent(searchTerm)}`)
      .then((res) => {
        setResults(res.data);
        setLoading(false);
        setShowDropdown(true);
      })
      .catch(() => {
        setResults([]);
        setLoading(false);
        setShowDropdown(false);
      });
  };

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetchUsers(query);
    }, 500);
    return () => clearTimeout(debounceTimeout.current);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCancel = () => {
    setQuery("");
    setResults([]);
    setShowDropdown(false);
    if (inputRef.current) inputRef.current.focus();
    // Si no hay usuario seleccionado, mostrar el perfil propio
    if (!selectedUser && myUser) {
      setSelectedUser(myUser);
      setShowFullProfile(true);
    }
  };

  const handleSearchClick = () => {
    fetchUsers(query);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setShowDropdown(false);
    setShowFullProfile(true);
  };

  const handleCloseFullProfile = () => {
    setShowFullProfile(false);
    // Mantener selectedUser para que no se borre la foto
  };

  const openEditModal = () => {
    if (!selectedUser) return;
    setEditName(selectedUser.name || "");
    setEditBio(selectedUser.bio || "");
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setIsUpdating(false);
  };

  // Función mejorada para guardar cambios
  const handleSaveEdit = async () => {
    if (!selectedUser) {
      alert("No hay usuario seleccionado");
      return;
    }
    
    // Validación básica
    if (!editName.trim()) {
      alert("El nombre no puede estar vacío");
      return;
    }

    if (editName.trim().length < 2) {
      alert("El nombre debe tener al menos 2 caracteres");
      return;
    }

    if (editBio.length > 500) {
      alert("La biografía no puede tener más de 500 caracteres");
      return;
    }
    
    setIsUpdating(true);
    
    try {
      const dataToSend = {
        name: editName.trim(),
        bio: editBio.trim(),
      };
      
      console.log("Enviando datos:", dataToSend);
      console.log("URL:", `/usuarios/${selectedUser.id}`);
      
      const response = await httpClient.patch(`/usuarios/${selectedUser.id}`, dataToSend);
      
      console.log("Respuesta exitosa:", response);
      
      // Actualizar usuario seleccionado
      const updatedUser = { 
        ...selectedUser, 
        name: editName.trim(), 
        bio: editBio.trim() 
      };
      
      setSelectedUser(updatedUser);
      
      // Si es el usuario propio, también actualizar myUser
      if (myUser?.id === selectedUser.id) {
        setMyUser(updatedUser);
      }
      
      setShowEditModal(false);
      setIsUpdating(false);
      alert("✅ Perfil actualizado correctamente");
      
    } catch (error) {
      setIsUpdating(false);
      
      console.error("Error completo:", error);
      console.error("Respuesta del servidor:", error.response?.data);
      console.error("Status:", error.response?.status);
      console.error("Headers:", error.response?.headers);
      
      // Manejo de errores específicos
      let errorMessage = "Error desconocido al actualizar perfil";
      
      if (error.response) {
        // El servidor respondió con un error
        const status = error.response.status;
        const data = error.response.data;
        
        switch (status) {
          case 400:
            errorMessage = data?.message || data?.error || "Datos inválidos";
            break;
          case 401:
            errorMessage = "No autorizado. Por favor, inicia sesión nuevamente";
            break;
          case 403:
            errorMessage = "No tienes permisos para editar este perfil";
            break;
          case 404:
            errorMessage = "Usuario no encontrado";
            break;
          case 422:
            errorMessage = data?.message || "Error de validación en los datos";
            break;
          case 500:
            errorMessage = "Error interno del servidor";
            break;
          default:
            errorMessage = data?.message || data?.error || `Error ${status}`;
        }
      } else if (error.request) {
        // No hubo respuesta del servidor
        errorMessage = "No se pudo conectar con el servidor. Verifica tu conexión";
      } else {
        // Error en la configuración de la petición
        errorMessage = error.message || "Error en la petición";
      }
      
      alert(`❌ ${errorMessage}`);
    }
  };

  const openShareModal = () => {
    if (!selectedUser) return;
    if (navigator.share) {
      navigator.share({
        title: `Perfil de ${selectedUser.name}`,
        text: `Mira el perfil de ${selectedUser.name}`,
        url: window.location.origin + "/perfil/" + selectedUser.id,
      }).catch(console.error);
    } else {
      setShowShareModal(true);
    }
  };

  const closeShareModal = () => setShowShareModal(false);

  const copyLinkToClipboard = () => {
    if (!selectedUser) return;
    const url = window.location.origin + "/perfil/" + selectedUser.id;
    navigator.clipboard.writeText(url)
      .then(() => alert("✅ Enlace copiado al portapapeles"))
      .catch(() => alert("❌ No se pudo copiar el enlace"));
  };

  const handlePhotoChange = async (e) => {
    if (!selectedUser) return;
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert("❌ Por favor selecciona una imagen válida");
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("❌ La imagen no puede ser mayor a 5MB");
      return;
    }
    
    setUploading(true);

    try {
      // Crear FormData para enviar la imagen
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await httpClient.post(`/usuarios/${selectedUser.id}/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Actualizar usuario con la nueva imagen
      const updatedUser = { 
        ...selectedUser, 
        avatar: response.data.avatarUrl || URL.createObjectURL(file)
      };
      
      setSelectedUser(updatedUser);
      if (myUser?.id === selectedUser.id) {
        setMyUser(updatedUser);
      }
      
      setUploading(false);
      alert("✅ Foto de perfil actualizada correctamente");
      
    } catch (error) {
      console.error("Error al subir imagen:", error);
      setUploading(false);
      
      // Si falla la subida, usar una simulación local
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...selectedUser, avatar: reader.result };
        setSelectedUser(updatedUser);
        if (myUser?.id === selectedUser.id) {
          setMyUser(updatedUser);
        }
        alert("⚠️ Foto actualizada localmente (modo simulación)");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mt-4">
      {/* Buscar */}
      <div className="text-center mb-4"><h2>Buscar Usuarios</h2></div>
      <div className="mb-3" style={{ maxWidth: 400, margin: "0 auto" }}>
        <div className="position-relative">
          <button
            type="button"
            onClick={handleSearchClick}
            style={{
              position: "absolute", top: "50%", left: 8, transform: "translateY(-50%)",
              border: "none", backgroundColor: "#0d6efd", padding: 6, borderRadius: "50%",
              cursor: "pointer", width: 32, height: 32, display: "flex", alignItems: "center",
              justifyContent: "center", color: "white", fontSize: 18
            }}
            aria-label="Buscar"
          >
            🔍
          </button>
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar por nombre o usuario"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-control ps-5"
            style={{ paddingRight: 90 }}
            aria-label="Campo de búsqueda"
          />
          <button
            onClick={handleCancel}
            className="btn btn-link"
            style={{ position: "absolute", top: "50%", right: 10, transform: "translateY(-50%)" }}
            aria-label="Cancelar búsqueda"
          >
            Cancelar
          </button>
        </div>
        {loading && <div className="text-center mt-2 text-muted">Cargando...</div>}
        {showDropdown && results.length > 0 && (
          <ul className="list-group mt-2 shadow" ref={dropdownRef} role="listbox" aria-label="Resultados de búsqueda">
            {results.map(user => (
              <li
                key={user.id}
                className="list-group-item d-flex align-items-center"
                onClick={() => handleSelectUser(user)}
                style={{ cursor: "pointer" }}
                role="option"
                aria-selected={selectedUser?.id === user.id}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSelectUser(user);
                  }
                }}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="rounded-circle me-3" style={{ width: 40, height: 40, objectFit: "cover" }} />
                ) : (
                  <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3" style={{ width: 40, height: 40 }}>
                    {user.name?.[0]}
                  </div>
                )}
                <div>
                  <div className="fw-bold">{user.name}</div>
                  <div className="text-muted">@{user.email}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Perfil completo */}
      {showFullProfile && selectedUser && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-white p-4 overflow-auto"
          style={{ zIndex: 20 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="profileTitle"
        >
          <button className="btn btn-outline-secondary mb-3" onClick={handleCloseFullProfile} aria-label="Cerrar perfil">← Volver</button>
          <div className="d-flex flex-column align-items-center">
            <div className="position-relative" style={{ width: 120, height: 120 }}>
              {selectedUser.avatar ? (
                <img src={selectedUser.avatar} alt="avatar" className="rounded-circle" style={{ width: 120, height: 120, objectFit: "cover" }} />
              ) : (
                <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: 120, height: 120, fontSize: 48 }}>
                  {selectedUser.name?.[0]}
                </div>
              )}
              <label htmlFor="upload-photo-input" style={{
                position: "absolute", bottom: 0, right: 0,
                backgroundColor: uploading ? "#6c757d" : "#0d6efd", 
                borderRadius: "50%",
                width: 36, height: 36, display: "flex", justifyContent: "center",
                alignItems: "center", color: "white", fontSize: 28,
                cursor: uploading ? "not-allowed" : "pointer",
                border: "2px solid white"
              }} title={uploading ? "Subiendo..." : "Cambiar foto de perfil"} aria-label="Cambiar foto de perfil">
                {uploading ? "⏳" : "+"}
              </label>
              <input
                id="upload-photo-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
                disabled={uploading}
              />
            </div>
            <h3 className="mt-3" id="profileTitle">{selectedUser.name}</h3>
            <p className="text-muted">@{selectedUser.email}</p>
            <p className="text-center" style={{ maxWidth: 400 }}>{selectedUser.bio || "Sin biografía"}</p>

            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-outline-primary" onClick={openShareModal}>Compartir perfil</button>
              <button className="btn btn-primary" onClick={openEditModal}>Editar perfil</button>
            </div>

            {/* Seguidores, Seguidos y Publicaciones */}
            <div className="d-flex justify-content-center gap-4 mt-4" style={{ maxWidth: 400, width: "100%" }}>
              <div className="text-center">
                <div className="fw-bold">{selectedUser.followers || 0}</div>
                <div>Seguidores</div>
              </div>
              <div className="text-center">
                <div className="fw-bold">{selectedUser.following || 0}</div>
                <div>Seguidos</div>
              </div>
              <div className="text-center">
                <div className="fw-bold">{selectedUser.posts || 0}</div>
                <div>Publicaciones</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Perfil */}
      {showEditModal && (
        <div
          className="modal d-block"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="editModalLabel"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 id="editModalLabel">Editar perfil</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeEditModal}
                  disabled={isUpdating}
                  aria-label="Cerrar modal"
                ></button>
              </div>
              
              <div className="mb-3">
                <label htmlFor="editName" className="form-label">Nombre *</label>
                <input
                  id="editName"
                  className="form-control"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  disabled={isUpdating}
                  maxLength={50}
                  placeholder="Ingresa tu nombre"
                />
                <small className="text-muted">{editName.length}/50 caracteres</small>
              </div>
              
              <div className="mb-3">
                <label htmlFor="editBio" className="form-label">Biografía</label>
                <textarea
                  id="editBio"
                  className="form-control"
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  disabled={isUpdating}
                  maxLength={500}
                  placeholder="Cuéntanos algo sobre ti..."
                />
                <small className="text-muted">{editBio.length}/500 caracteres</small>
              </div>
              
              <div className="d-flex justify-content-end gap-2">
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
                  disabled={isUpdating || !editName.trim()}
                >
                  {isUpdating ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Guardando...
                    </>
                  ) : (
                    "Guardar"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Compartir Perfil */}
      {showShareModal && (
        <div
          className="modal d-block"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="shareModalLabel"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 id="shareModalLabel">Compartir perfil</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeShareModal}
                  aria-label="Cerrar modal"
                ></button>
              </div>
              
              <p>Copia el enlace para compartir el perfil:</p>
              <input
                type="text"
                readOnly
                className="form-control mb-3"
                value={window.location.origin + "/perfil/" + selectedUser?.id}
                onFocus={(e) => e.target.select()}
              />
              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-secondary" onClick={closeShareModal}>Cerrar</button>
                <button className="btn btn-primary" onClick={copyLinkToClipboard}>Copiar enlace</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}