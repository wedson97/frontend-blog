import React, { useEffect, useState } from 'react';
import api from '../../../../../api/requisicoes';
import { useUser } from '../../../../../context/UseContext';

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
      } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
      }
      
      console.log(comentarios);
      
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
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={jsonPost.conteudo}
          onChange={handleChangeConteudo}
          placeholder="Digite seu comentário"
          style={{ width: 'calc(100% - 100px)', padding: '8px' }}
        />
        <button onClick={adicionarComentario} style={{ padding: '8px 16px' }}>
          Adicionar
        </button>
      </div>

      {comentarios.length > 0 ? (
        comentarios.map((comentario) => (
          <div
            key={comentario.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              borderBottom: '1px solid #ddd'
            }}
          >
            {comentario.autor_id === login.id ? (
              <div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>
                    {comentario.nome_usuario}
                  </p>
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{ margin: '5px 0' }}>{comentario.conteudo}</p>
                </div>

                <div>
                  <button onClick={() => deleteComentario(comentario.id)}>
                    Excluir
                  </button>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '12px',
                    color: 'gray'
                  }}
                >
                  <p style={{ margin: 0 }}>{comentario.criado_em}</p>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '15px'
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>
                    {comentario.nome_usuario}
                  </p>
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{ margin: '5px 0' }}>{comentario.conteudo}</p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '12px',
                    color: 'gray'
                  }}
                >
                  <p style={{ margin: 0 }}>{comentario.criado_em}</p>
                </div>
              </div>
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
