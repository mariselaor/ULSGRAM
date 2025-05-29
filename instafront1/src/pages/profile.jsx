import { useState } from 'react';

export default function PerfilApp() {
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  
  const usuarios = [
    { id: 1, name: "Mi Perfil", email: "miemail@ejemplo.com" },
    { id: 2, name: "Juan Perez", email: "juan@ejemplo.com" },
    { id: 3, name: "Ana Gomez", email: "ana@ejemplo.com" },
  ];

  const resultadosFiltrados = usuarios.filter(u =>
    u.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 600, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Buscador de usuarios</h2>
      <input
        type="text"
        placeholder="Busca un usuario"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      {!perfilSeleccionado ? (
        <div>
          <h3>Resultados</h3>
          {resultadosFiltrados.length === 0 && <p>No hay resultados.</p>}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {resultadosFiltrados.map(u => (
              <li key={u.id} style={{ marginBottom: 8 }}>
                <button
                  onClick={() => setPerfilSeleccionado(u)}
                  style={{
                    cursor: 'pointer',
                    background: '#eee',
                    border: 'none',
                    padding: '8px 12px',
                    width: '100%',
                    textAlign: 'left',
                    borderRadius: 4,
                  }}
                >
                  {u.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setPerfilSeleccionado(null)}
            style={{
              marginBottom: 20,
              background: '#ddd',
              border: 'none',
              padding: '6px 12px',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            ← Volver a búsqueda
          </button>
          <h2>Perfil de {perfilSeleccionado.name}</h2>
          <p><b>Email:</b> {perfilSeleccionado.email}</p>
        </div>
      )}
    </div>
  );
}