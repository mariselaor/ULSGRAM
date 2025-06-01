import { useEffect, useState } from "react";
import { httpClient } from "../api/HttpClient";

export default function Comentarios({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const res = await httpClient.get(`/publicaciones/${postId}/comentarios`);
      setComments(res.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error al cargar comentarios:", err);
      setError("Error al cargar comentarios. Intenta nuevamente.");
      setComments([]);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      setError("El comentario no puede estar vacío");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await httpClient.post(`/publicaciones/${postId}/comentarios`, {
        contenido: newComment.trim()
      });

      // Actualiza la lista de comentarios después de guardar
      await fetchComments();
      setNewComment("");
    } catch (error) {
      console.error("Error al enviar comentario:", error);
      setError(
        error.response?.data?.message ||
        "Error al enviar comentario. Verifica tu conexión."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleAddComment();
    }
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h6>Comentarios ({comments.length})</h6>

      {error && <p style={{ color: "red", fontSize: "0.8rem" }}>{error}</p>}

      {comments.length === 0 && !error && <p>No hay comentarios aún.</p>}

      <ul style={{
          listStyle: "none",
          padding: 0,
          maxHeight: "200px",
          overflowY: "auto",
        }}>
        {comments.map((c) => (
          <li key={c.id} style={{
              marginBottom: "10px",
              padding: "5px",
              borderBottom: "1px solid #eee",
            }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <strong style={{ fontSize: "0.9rem" }}>
                  {c.user?.name ?? "Anónimo"}:
                </strong>
                <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                  {c.contenido}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un comentario..."
          disabled={loading}
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px 0 0 4px",
            fontSize: "0.9rem",
          }}
        />
        <button
          onClick={handleAddComment}
          disabled={loading || !newComment.trim()}
          style={{
            padding: "8px 15px",
            background: loading ? "#ccc" : "#0095f6",
            color: "white",
            border: "none",
            borderRadius: "0 4px 4px 0",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "0.9rem",
          }}
        >
          {loading ? "Enviando..." : "Publicar"}
        </button>
      </div>
    </div>
  );
}