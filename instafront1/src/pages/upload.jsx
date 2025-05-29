import { useState } from "react";
import { httpClient } from "../api/HttpClient";

export default function CrearPublicacion() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const token = localStorage.getItem("token"); // O donde almacenes tu token
      const response = await httpClient.post("/publicaciones", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`, // Incluye el token en la solicitud
        },
      });
      console.log("Publicación creada:", response.data);
    } catch (error) {
      console.error("Error al crear publicación:", error.response || error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Subir</button>
    </form>
  );
}
