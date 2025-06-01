import { useState } from "react";
import { httpClient } from '../api/HttpClient'; 

export default function CrearPublicacion() {
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
  });
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!imagen) {
      setError("La imagen es obligatoria.");
      return;
    }

    const formData = new FormData();
    formData.append("imagen", imagen);
    formData.append("titulo", form.titulo);
    formData.append("descripcion", form.descripcion);

    try {
      const response = await httpClient.post("http://localhost:8000/api/publicaciones", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Publicación creada con éxito");
      setForm({ titulo: "", descripcion: "" });
      setImagen(null);
    } catch (err) {
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        if (errors) {
          const messages = Object.values(errors).map(msg =>
            Array.isArray(msg) ? msg.join(" ") : msg
          );
          setError(messages.join(" "));
        } else {
          setError("Error de validación en el formulario.");
        }
      } else {
        setError(err.response?.data?.message || "Error al crear la publicación.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Crear Publicación</h2>
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={form.titulo}
        onChange={handleChange}
        required
      />
      <br />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
        required
        rows={4}
      />
      <br />
      <input
        type="file"
        name="imagen"
        onChange={handleFileChange}
        accept="image/*"
        required
      />
      <br />
      <button type="submit">Crear Publicación</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
}
