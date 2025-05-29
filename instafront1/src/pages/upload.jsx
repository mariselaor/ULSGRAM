import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function CrearPublicacion() {
  const [imagen, setImagen] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    setImagen(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagen || !titulo || !descripcion) {
      setMensaje('Todos los campos son obligatorios');
      return;
    }

    const formData = new FormData();
    formData.append('imagen', imagen);
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);

    try {
      const response = await axios.post('http://localhost:8000/api/publicaciones', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMensaje('Publicación creada con éxito ✅');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setMensaje('Error al subir la publicación ❌');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Crear nueva publicación</h2>

      {mensaje && <p className="text-center text-sm text-gray-600 mb-4">{mensaje}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div {...getRootProps()} className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer">
          <input {...getInputProps()} />
          {imagen ? (
            <p className="text-green-600">Imagen seleccionada: {imagen.name}</p>
          ) : isDragActive ? (
            <p>Suelta la imagen aquí...</p>
          ) : (
            <p>Haz clic o arrastra una imagen aquí</p>
          )}
        </div>

        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full"
        >
          Publicar
        </button>
      </form>
    </div>
  );
}
