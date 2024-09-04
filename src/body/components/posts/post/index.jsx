import React, { useEffect } from 'react';
import './css/style.css'; // Importa o arquivo CSS
import { useUser } from '../../../../context/UseContext';
import api from '../../../../api/requisicoes';
import { Link } from 'react-router-dom';

function Post() { 
  const { posts, setPosts } = useUser();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await api.get('/posts');
            setPosts(response.data.posts);
            
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    fetchData();
  }, [setPosts]);
  
  return (
    <div>
      {posts.map(post => (
          <div className="postContainer">
            <Link key={post.id} to={`/post/${post.id}`} className="postLink">
            <img 
              src={`${api.defaults.baseURL}images/${post.imagem_url}`} 
              alt={`Imagem do ${post.titulo}`} 
              className="image"
            />
            <div className="content">
              <h2 className="title">{post.titulo}</h2>
            </div>
            </Link>
          </div>
        
      ))}
    </div>
  );
}

export default Post;
