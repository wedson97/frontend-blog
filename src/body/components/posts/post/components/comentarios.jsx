import { useEffect, useState } from 'react';
import api from '../../../../../api/requisicoes';
import { useUser } from '../../../../../context/UseContext';
import { json } from 'react-router-dom';

function Comentarios({ post_id }) {
  const { login } = useUser();
  const [comentarios, setComentarios] = useState([]);
  
  const [jsonPost, setJsonPost] = useState({
    post_id: parseInt(post_id),
    autor_id: parseInt(login.id),
    conteudo: ''
  });

  const deleteComentario = async (id) => {
    try {
      const response = await api.delete('/comentarios/' + id);
      if (response.status === 200) {
        const responseComentarios = await api.get('/comentarios/' + post_id);
        if (responseComentarios.status === 200) {
          setComentarios(responseComentarios.data.comentario);
        }
      }
    } catch (error) {
      console.error('Erro ao deletar comentário:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/comentarios/' + post_id);
        if (response.status === 200) {
          setComentarios(response.data.comentario);
        }
      } catch (error) {
        console.error('Erro ao buscar comentários:', error);
      }
    };
    fetchData();
  }, [post_id]);

  const adicionarComentario = async () => {
    if (login.id != null) {
      try {
        await api.post('/comentarios', jsonPost);
        const response = await api.get('/comentarios/' + post_id);
        setComentarios(response.data.comentario)
        setJsonPost((prevState) => ({
          ...prevState,
          conteudo: ''
        }));
      } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
      }
      
      
    }
  };
  
  const handleChangeConteudo = (e) => {
    setJsonPost((prevState) => ({
      ...prevState,
      conteudo: e.target.value
    }));
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={jsonPost.conteudo}
          onChange={handleChangeConteudo}
          placeholder="Digite seu comentário"
          style={{
            width: 'calc(100% - 120px)',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <button
          onClick={adicionarComentario}
          style={{
            padding: '5px 10px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Adicionar
        </button>
      </div>
  
      {comentarios.length > 0 ? (
        comentarios.map((comentario) => (
          <div
            key={comentario.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',  // Garante que o conteúdo e o botão fiquem separados
              alignItems: 'center',  // Centraliza verticalmente
              padding: '10px',
              borderBottom: '1px solid #ddd',
              marginBottom: '10px',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{comentario.nome_usuario}</p>
              <p style={{ margin: '5px 0', color: '#333' }}>{comentario.conteudo}</p>
              {/* <p style={{ fontSize: '12px', color: 'gray' }}>{comentario.criado_em}</p> */}
              <p style={{ fontSize: '12px', color: 'gray' }}>{new Date(comentario.criado_em).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })}</p>
              
              
            </div>
            {comentario.autor_id === login.id && (
              <button
                onClick={() => deleteComentario(comentario.id)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  marginLeft: '20px',  // Para dar um espaço entre o conteúdo e o botão
                }}
              >
                Excluir
              </button>
            )}
          </div>
        ))
      ) : (
        <p>Nenhum comentário disponível.</p>
      )}
    </div>
  );
  
  
}

export default Comentarios;
