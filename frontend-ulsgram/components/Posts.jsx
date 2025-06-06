import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los posts:', error);
      });
  }, []);

  if (!posts.length) {
    return <p className="text-center">No hay posts, sigue a alguien para poder mostrar sus posts</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {posts.map(post => (
        <div key={post.id}>
          <a href={`/posts/${post.user_id}/${post.id}`}>
            <img
              src={`http://localhost:8000/uploads/${post.imagen}`}
              alt={`Imagen del post ${post.titulo}`}
            />
          </a>
        </div>
      ))}
    </div>
  );
}

export default Posts;
