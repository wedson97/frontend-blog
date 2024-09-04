import React from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../../../../context/UseContext';
import './css/stylePostCompleto.css'
import LikeDeslike from './likeDeslike';
import Comentarios from './comentarios';
import api from '../../../../../api/requisicoes';


function PostCompleto() {
  const { id } = useParams();
  const { posts } = useUser();

  const post = posts.find(post => post.id === parseInt(id));
  if (!post) {
    return <p>Post não encontrado.</p>;
  }
  
  return (
    <div className="postContainerPostCompleto">
      <img 
        src={`${api.defaults.baseURL}images/${post.imagem_url}`} 
        alt={`Imagem do ${post.titulo}`} 
        className="imagePostCompleto"
      />
      <div className="contentPostCompleto">
        <h1 className="titlePostCompleto">{post.titulo}</h1>
        <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: post.conteudo }} />
      </div>
      <LikeDeslike usuario_id={id} post_id={post.id}/>
      <Comentarios usuario_id={id} post_id={post.id}/>
    </div>
  );
}

export default PostCompleto;
