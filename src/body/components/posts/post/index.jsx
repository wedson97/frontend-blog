import { useEffect } from 'react';
import './css/style.css'; // Importa o arquivo CSS
import { useUser } from '../../../../context/UseContext';
import api from '../../../../api/requisicoes';
import { Link } from 'react-router-dom';

function Post() {
  const { posts, setPosts, usuarios, setUsuarios } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/posts');
        if (response.status === 200) {
          setPosts(response.data.posts);
        }

        const response_usuarios = await api.get('/usuarios');
        if (response_usuarios.status === 200) {
          setUsuarios(response_usuarios.data.usuarios);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, [setPosts]);

  return (
    <div>
      {posts.map((post) => {
        const autor = usuarios.find((usuario) => usuario.id === post.autor_id
      );
        
        return (
          <div key={post.id} className="postContainer" style={{ position: 'relative' }}>
  <Link to={`/post/${post.id}`} className="postLink">
    <img
      src={`${api.defaults.baseURL}images/${post.imagem_url}`}
      alt={`Imagem do ${post.titulo}`}
      className="image"
    />
    <div className="content">
      <h2 className="title">{post.titulo}</h2>
    </div>
  </Link>
  <div style={{
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    color:"#b7b7b7",
    padding: '5px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center'
  }}>
    <h6 style={{ marginRight: "10px" }}>{autor ? autor.nome_usuario : 'Autor desconhecido'}</h6>
    <h6>{new Date(post.criado_em).toLocaleDateString('pt-BR')}</h6>
  </div>
</div>

        );
      })}
    </div>
  );
}

export default Post;
