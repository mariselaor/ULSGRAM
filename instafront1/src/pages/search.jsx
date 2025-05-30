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

  // Estados relacionados con el modal de compartir (se mantienen)
  const [showShareModal, setShowShareModal] = useState(false); 

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const debounceTimeout = useRef(null);

  // El estado 'uploading' ya no es necesario, pero lo dejo comentado por si acaso
  // const [uploading, setUploading] = useState(false); 

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

  // Funciones del modal de compartir (se mantienen)
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

  // La función handlePhotoChange ha sido eliminada
  // Si deseas una foto de perfil estática o predeterminada, deberías gestionarla en el `selectedUser.avatar`

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
            {/* Contenedor de la foto de perfil - sin el input ni el botón de "cambiar" */}
            <div className="position-relative" style={{ width: 120, height: 120 }}>
              {selectedUser.avatar ? (
                <img src={selectedUser.avatar} alt="avatar" className="rounded-circle" style={{ width: 120, height: 120, objectFit: "cover" }} />
              ) : (
                <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: 120, height: 120, fontSize: 48 }}>
                  {selectedUser.name?.[0]}
                </div>
              )}
              {/* Se eliminó la etiqueta <label> y el input type="file" */}
            </div>
            <h3 className="mt-3" id="profileTitle">{selectedUser.name}</h3>
            <p className="text-muted">@{selectedUser.email}</p>
            <p className="text-center" style={{ maxWidth: 400 }}>{selectedUser.bio || "Sin biografía"}</p>

            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-outline-primary" onClick={openShareModal}>Compartir perfil</button>
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

      {/* Se eliminó completamente el Modal Editar Perfil */}

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